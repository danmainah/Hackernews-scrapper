const WebSocket = require('ws');
const db = require('./db');
const { scrapeHackerNews } = require('./scraper');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', async (ws) => {
    const recentStories = await db.getRecentStories();
    ws.send(JSON.stringify({ type: 'initial', stories: recentStories }));

    scrapeHackerNews(); 

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

module.exports = wss;
