# Google Sheets setup (RSVP + Wishes)

Spreadsheet: https://docs.google.com/spreadsheets/d/19jWZVO3IHYd2pB06-0oetu2x5RSShjPTKbbiV0jo8Bs/edit

1. Open the spreadsheet, then **Extensions > Apps Script**.
2. Replace everything in `Code.gs` with the contents of `google-apps-script/code.gs`, then save.
3. (Optional) Select the `setup` function and click **Run** to create the `RSVP` and `Wishes`
   sheets with headers right away. Otherwise they are created on the first submission.
4. Click **Deploy > New deployment**, type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise, deploy, and copy the **Web App URL** (ends with `/exec`).
6. In the project root create `.env`:

   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
   ```

7. Restart `npm run dev`. On your hosting (Vercel/Netlify) add the same environment
   variable and redeploy.

Sheets created automatically:

| Sheet  | Columns |
| ------ | ------- |
| RSVP   | Timestamp, Invited As, Full Name, Phone, Attendance, Guests, Notes |
| Wishes | Timestamp, Invited As, Name, Message |

If you change `code.gs` later, use **Deploy > Manage deployments > Edit > New version**
so the same URL keeps working.
