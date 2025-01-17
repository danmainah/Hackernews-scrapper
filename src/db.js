const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hacker_news',
});

async function saveStories(stories) {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO stories (title, link) VALUES ?', [stories.map(s => [s.title, s.link])]);
    connection.release();
}

async function getRecentStories() {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM stories WHERE created_at > NOW() - INTERVAL 5 MINUTE');
    connection.release();
    return rows;
}

module.exports = { saveStories, getRecentStories };
