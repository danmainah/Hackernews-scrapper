const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db');

async function scrapeAndBroadcastStories() {
    try {
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        // Iterate through each story row
        $('.athing').each((index, element) => {
            const rank = $(element).find('.rank').text().trim(); // Get rank
            const titleElement = $(element).find('.titleline > a'); // Title link
            const title = titleElement.text(); // Story title
            const link = titleElement.attr('href'); // Story link

            // Find the subtext row for additional information
            const subtextElement = $(element).next('.subtext');
            const score = subtextElement.find('.score').text() || '0 points'; // Score or default to 0
            const user = subtextElement.find('.hnuser').text(); // User who posted
            const age = subtextElement.find('.age').text(); // Time since posted

            stories.push({ rank, title, link, score, user, age });
        });

        if (stories.length > 0) {
            await db.saveStories(stories);
            console.log('Scraped Hacker News:');
            stories.forEach((story, index) => {
                console.log(`#${index + 1} ${story.title} - ${story.link} (${story.score} points, posted by ${story.user} ${story.age} ago)`);
            });
        } else {
            console.log('No new stories found.');
        }
    } catch (error) {
        console.error('Error scraping Hacker News:', error);
    }
}

// Call the new function to scrape and broadcast new stories every minute
setInterval(scrapeAndBroadcastStories, 60000);

module.exports = { scrapeAndBroadcastStories };