const WebSocket = require('ws');
const db = require('./db');
const { scrapeAndBroadcastStories } = require('./scraper');

const wss = new WebSocket.Server({ port: 8080 });
const clients = [];

wss.on('connection', async (ws) => {
    clients.push(ws);

    const recentStoriesCount = await db.getRecentStoriesCount(5);
    ws.send(JSON.stringify({ type: 'initial', storiesCount: recentStoriesCount }));

    scrapeAndBroadcastStories();

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

module.exports = wss;