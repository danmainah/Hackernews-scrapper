const mysql = require('mysql2/promise');
const fs = require('fs');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12341234',
    database: 'hacker_news',
});

const initSql = fs.readFileSync('./src/init.sql', 'utf8');
const queries = initSql.split(';').map(query => query.trim()).filter(query => query !== '');

pool.getConnection()
  .then((connection) => {
    const promises = [];
    for (const query of queries) {
      promises.push(connection.query(query));
    }
    return Promise.all(promises).then(() => {
      connection.release();
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

async function saveStories(stories) {
    const connection = await pool.getConnection();
    try {
        const values = stories.map(story => [story.title, story.link]);
        await connection.query('INSERT INTO stories (title, link) VALUES ?', [values]);
    } finally {
        connection.release();
    }
}

async function getRecentStories() {
    const connection = await pool.getConnection();
    const [stories] = await connection.query(`
        SELECT *
        FROM stories
        WHERE created_at > NOW() - INTERVAL 5 MINUTE
    `);
    connection.release();
    return stories;
}

async function getRecentStoriesCount(minutes) {
    const query = `SELECT COUNT(*) FROM stories WHERE created_at >= NOW() - INTERVAL ${minutes} MINUTE`;
    const result = await db.query(query);
    return result[0]['COUNT(*)'];
  }

module.exports = { saveStories, getRecentStories, getRecentStoriesCount };
