/**
 * Shavindu & Dulakshi — Wedding Invitation backend
 * Stores RSVPs and Wishes in separate sheets. Sheets and headers are
 * created automatically on the first submission (or by running setup()).
 */

const SPREADSHEET_ID = '19jWZVO3IHYd2pB06-0oetu2x5RSShjPTKbbiV0jo8Bs';

const SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Invited As', 'Full Name', 'Phone', 'Attendance', 'Guests', 'Notes'],
    widths: [170, 180, 200, 140, 140, 80, 320],
    row: function (p) {
      return [new Date(), p.invitedAs || '', p.name || '', p.phone || '', p.attendance || '', p.guests || '', p.notes || ''];
    },
  },
  Wishes: {
    name: 'Wishes',
    headers: ['Timestamp', 'Invited As', 'Name', 'Message'],
    widths: [170, 180, 200, 480],
    row: function (p) {
      return [new Date(), p.invitedAs || '', p.name || '', p.message || ''];
    },
  },
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const payload = parsePayload_(e);
    const config = findSheetConfig_(payload.sheet);
    if (!config) {
      return jsonResponse_({ ok: false, error: 'Invalid sheet. Use RSVP or Wishes.' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, config);
    sheet.appendRow(config.row(payload).map(sanitize_));

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: 'Wedding form endpoint is running.' });
}

/** Run once manually from the editor to create both sheets up front (optional). */
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.keys(SHEETS).forEach(function (key) {
    getOrCreateSheet_(ss, SHEETS[key]);
  });
}

function findSheetConfig_(name) {
  const wanted = String(name || '').toLowerCase();
  if (wanted === 'wish' || wanted === 'wishes') return SHEETS.Wishes;
  if (wanted === 'rsvp') return SHEETS.RSVP;
  return null;
}

function getOrCreateSheet_(ss, config) {
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  if (sheet.getLastRow() === 0) {
    writeHeaders_(sheet, config);
  }
  return sheet;
}

function writeHeaders_(sheet, config) {
  const range = sheet.getRange(1, 1, 1, config.headers.length);
  range
    .setValues([config.headers])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#6b4f3a')
    .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
  config.widths.forEach(function (w, i) {
    sheet.setColumnWidth(i + 1, w);
  });
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
}

// Prevent formula injection from user-supplied text
function sanitize_(value) {
  if (typeof value === 'string' && /^[=+\-@]/.test(value)) {
    return "'" + value;
  }
  return value;
}

function parsePayload_(e) {
  const params = e && e.parameter ? e.parameter : {};
  if (Object.keys(params).length > 0) {
    return params;
  }

  const contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!contents) {
    return {};
  }

  try {
    return JSON.parse(contents);
  } catch (_error) {
    return {};
  }
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
