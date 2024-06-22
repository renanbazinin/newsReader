const express = require('express');
const { fetchBBCNewsRSS, fetchNYTNewsRSS } = require('./fetchNews');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/bbc', async (req, res) => {
    try {
        const newsItems = await fetchBBCNewsRSS();
        console.log(newsItems);
        res.json(newsItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.get('/nyt', async (req, res) => {
    try {
        const newsItems = await fetchNYTNewsRSS();
        res.json(newsItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
