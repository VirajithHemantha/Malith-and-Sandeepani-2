# Google Sheets setup (RSVP + Wishes)

Spreadsheet: https://docs.google.com/spreadsheets/d/1jCiK3wO6IDIDn4eK0DmzlQtAPlWiB7hhwjzJH3gHrLU/edit

1. Open the spreadsheet and go to **Extensions > Apps Script**.
2. Delete everything in `Code.gs` and paste the full contents of `google-apps-script/code.gs`. Save.
3. Choose `setupSheets` in the function dropdown and click **Run** to create the
   `RSVP` and `Wishes` sheets with headers right away. Approve the permission prompt
   (Advanced > Go to project > Allow). Otherwise they are created on the first submission.
4. Click **Deploy > New deployment**, choose type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the Web app URL (ends in `/exec`).
6. In the project root create a file named `.env`:

   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

7. In Vercel: **Project > Settings > Environment Variables**, add the same
   `VITE_GOOGLE_APPS_SCRIPT_URL`, then redeploy.

## Sheets created

| Sheet  | Columns                                                               |
| ------ | --------------------------------------------------------------------- |
| RSVP   | Timestamp, Full Name, Phone, Attendance, Guests, Invited As, Notes    |
| Wishes | Timestamp, Name, Message                                              |

"Invited As" is the guest name from the personalised link (e.g. `Mr. Sanjaya`), empty for the plain link.
Wishes saved in the sheet are also shown in the guestbook on the invitation.

## Updating the script later

After changing `code.gs`, use **Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy**
so the same URL keeps working.
