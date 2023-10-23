const express = require('express');
const json2xls = require('json2xls');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Enable JSON request body parsing
app.use(bodyParser.json());

// Define a route to handle JSON to Excel conversion
app.post('/convert', (req, res) => {
  try {
    const data = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid JSON data provided' });
    }

    // Convert JSON data to Excel format
    const xls = json2xls(data);

    // Set the response headers for Excel file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

    // Send the Excel file as a response
    res.end(xls, 'binary');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during conversion.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
