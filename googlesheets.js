const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const sheets = google.sheets({ version: "v4", auth: new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
) });

const sheetId = process.env.GOOGLE_SHEET_ID;

async function markAttendance(studentId, timestamp) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:B", // Assuming first two columns: Student ID, Timestamp
      valueInputOption: "RAW",
      resource: {
        values: [[studentId, timestamp]],
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error marking attendance:", err);
    throw err;
  }
}

module.exports = { markAttendance };
