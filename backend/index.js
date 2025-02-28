

// // // // import express from "express";
// // // // import cors from "cors";
// // // // import { google } from "googleapis";
// // // // import { join, dirname } from "path";
// // // // import { fileURLToPath } from "url";
// // // // import { readFileSync } from "fs";

// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = dirname(__filename);

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // Read credentials from JSON file
// // // // const credentials = JSON.parse(readFileSync(join(__dirname, "credentials.json"), "utf8"));

// // // // // Google Sheets Setup
// // // // const client = new google.auth.JWT(
// // // //   credentials.client_email,
// // // //   null,
// // // //   credentials.private_key,
// // // //   ["https://www.googleapis.com/auth/spreadsheets"]
// // // // );
// // // // const sheets = google.sheets({ version: "v4", auth: client });
// // // // const SPREADSHEET_ID = "your-spreadsheet-id";

// // // // app.post("/attendance", async (req, res) => {
// // // //   try {
// // // //     const { qrCode } = req.body;
// // // //     if (!qrCode) {
// // // //       return res.status(400).json({ message: "QR Code is required" });
// // // //     }

// // // //     const timestamp = new Date().toISOString();
// // // //     await sheets.spreadsheets.values.append({
// // // //       spreadsheetId: SPREADSHEET_ID,
// // // //       range: "Sheet1!A:B",
// // // //       valueInputOption: "RAW",
// // // //       requestBody: { values: [[qrCode, timestamp]] },
// // // //     });

// // // //     res.json({ message: "Attendance marked successfully!" });
// // // //   } catch (error) {
// // // //     console.error("Error saving attendance:", error);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // });

// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on port ${PORT}`);
// // // // });

// // // // export default app;

// // // // index.js
// // // import express from 'express';
// // // import fs from 'fs';
// // // import path from 'path';

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // // Middleware to parse JSON requests
// // // app.use(express.json());

// // // // Endpoint to get credentials
// // // app.get('/api/credentials', (req, res) => {
// // //     const filePath = path.join(__dirname, 'credentials.json');

// // //     fs.readFile(filePath, 'utf8', (err, data) => {
// // //         if (err) {
// // //             console.error('Error reading credentials file:', err);
// // //             return res.status(500).json({ error: 'Failed to read credentials' });
// // //         }

// // //         try {
// // //             const credentials = JSON.parse(data);
// // //             res.json(credentials);
// // //         } catch (parseError) {
// // //             console.error('Error parsing credentials JSON:', parseError);
// // //             res.status(500).json({ error: 'Failed to parse credentials' });
// // //         }
// // //     });
// // // });

// // // // Start the server
// // // app.listen(PORT, () => {
// // //     console.log(`Server is running on http://localhost:${PORT}`);
// // // });

// // // index.js
// // import express from 'express';

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware to parse JSON requests
// // app.use(express.json());

// // // Endpoint to get a static message
// // app.get('/api/message', (req, res) => {
// //     res.json({ message: 'Hello, this is your backend API!' });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });

// // index.js
// import express from 'express';
// import fs from 'fs';
// import { google } from 'googleapis';
// import path from 'path';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Load client secrets from a local file
// const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// const auth = new google.auth.GoogleAuth({
//     keyFile: CREDENTIALS_PATH,
//     scopes: SCOPES,
// });

// // Function to append data to Google Sheets
// const appendDataToSheet = async (spreadsheetId, data) => {
//     const sheets = google.sheets({ version: 'v4', auth });
//     const resource = {
//         values: data,
//     };

//     try {
//         const response = await sheets.spreadsheets.values.append({
//             spreadsheetId,
//             range: 'Sheet1!A1', // Adjust the range as needed
//             valueInputOption: 'RAW',
//             resource,
//         });
//         console.log('Data appended:', response.data.updates);
//     } catch (error) {
//         console.error('Error appending data to sheet:', error);
//     }
// };

// // Endpoint to read data from JSON and append to Google Sheets
// app.get('/api/merge', async (req, res) => {
//     const dataFilePath = path.join(__dirname, 'data.json');

//     fs.readFile(dataFilePath, 'utf8', async (err, data) => {
//         if (err) {
//             console.error('Error reading data file:', err);
//             return res.status(500).json({ error: 'Failed to read data file' });
//         }

//         try {
//             const jsonData = JSON.parse(data);
//             const values = jsonData.map(item => [item.name, item.age]); // Convert to 2D array

//             const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
//             await appendDataToSheet(spreadsheetId, values);

//             res.json({ message: 'Data merged successfully!' });
//         } catch (parseError) {
//             console.error('Error parsing JSON data:', parseError);
//             res.status(500).json({ error: 'Failed to parse JSON data' });
//         }
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Load client secrets from a local file
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
});

// Function to append data to Google Sheets
const appendDataToSheet = async (spreadsheetId, data) => {
    const sheets = google.sheets({ version: 'v4', auth });
    const resource = {
        values: data,
    };

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A1', // Adjust the range as needed
            valueInputOption: 'RAW',
            resource,
        });
        console.log('Data appended:', response.data.updates);
    } catch (error) {
        console.error('Error appending data to sheet:', error);
    }
};

// Endpoint to read data from JSON and append to Google Sheets
app.get('/api/merge', async (req, res) => {
    const dataFilePath = join(__dirname, 'data.json');

    readFileSync(dataFilePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        try {
            const jsonData = JSON.parse(data);
            const values = jsonData.map(item => [item.name, item.age]); // Convert to 2D array

            const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
            await appendDataToSheet(spreadsheetId, values);

            res.json({ message: 'Data merged successfully!' });
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ error: 'Failed to parse JSON data' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;