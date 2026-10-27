export const WEDDING = {
  groom: {
    name: 'Shavindu',
    father: 'Mr. Amila Wickramanayake',
    mother: 'Mrs. Wathsala Hettiarachchi',
  },
  bride: {
    name: 'Vichalya',
    father: 'Mr. Sisira Herath',
    mother: 'Mrs. Shirani Kumudukumari',
  },
  date: new Date('2026-11-11T08:30:00+05:30'),
  dateDots: '11 . 11 . 2026',
  dateLong: 'November 11, 2026',
  dayLabel: 'Wednesday, November 11',
  yearInWords: 'The Year Two Thousand Twenty Six',
  timeRange: '08:30 AM – 03:30 PM',
  venue: 'Earls Regency',
  city: 'Kandy',
  mapUrl: 'https://maps.app.goo.gl/DBMyvG8Wu8i74MqD8',
};

// Google Apps Script Web App URL (see google-apps-script/SETUP.md)
export const GOOGLE_SCRIPT_URL: string =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzFTBq5TKXptFQvu5eWbfJoiwoXGu3SGaEOmTqT8RuOEX4unHi_nu8JvK9nL-r8ojBx_A/exec';

export type SheetName = 'RSVP' | 'Wishes';

export async function submitToSheet(sheet: SheetName, data: Record<string, string>) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('VITE_GOOGLE_APPS_SCRIPT_URL is not configured');
  }
  const body = new URLSearchParams({ sheet, ...data });
  // Apps Script web apps don't send CORS headers, so the response is opaque.
  await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
}

// Guest name from personalised links: /{encoded display name}
export function getGuestNameFromPath(): string {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!path || path.toLowerCase() === 'admin') return '';
  try {
    return decodeURIComponent(path).trim();
  } catch {
    return '';
  }
}
