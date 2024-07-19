// require('dotenv').config({ path: 'key.env' });
const express = require('express');
const path = require('path');
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend-vite/dist')));

// Serve the frontend index.html for any unhandled routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend-vite/dist', 'index.html'));
});

// Start the server and handle errors
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1); // Exit the process with failure
    } else {
        throw err;
    }
});