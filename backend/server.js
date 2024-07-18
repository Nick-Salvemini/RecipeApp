require('dotenv').config({ path: 'key.env' });
const express = require('express');
const app = require('./app');
const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend-vite/dist')));

// Serve the frontend index.html for any unhandled routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend-vite/dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});