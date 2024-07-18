require('dotenv').config({ path: 'key.env' });
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
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
});