

// import express from 'express';
// import cors from 'cors';
// import { google } from 'googleapis';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';
// import { readFileSync } from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Load client secrets from a local file
// const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
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
//     const dataFilePath = join(__dirname, 'data.json');

//     readFileSync(dataFilePath, 'utf8', async (err, data) => {
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
// const PORT = process.env.PORT || 5001; // Change 5000 to 5001 or any other available port
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// export default app;

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
const PORT = process.env.PORT || 5002; // Change 5001 to 5002 or any other available port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;