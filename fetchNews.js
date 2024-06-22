const axios = require('axios');
const xml2js = require('xml2js');

async function fetchBBCNewsRSS() {
    try {
        const response = await axios.get('https://feeds.bbci.co.uk/news/world/rss.xml');
        const rssData = response.data;

        const parser = new xml2js.Parser({ explicitArray: false, cdata: true });
        const result = await parser.parseStringPromise(rssData);

        const items = result.rss.channel.item;

        // Get the last 30 items
        const latestItems = items.slice(0, 60);

        // Save elements of each item
        const newsItems = latestItems.map(item => ({
            title: item.title && item.title._ ? item.title._ : item.title,
            description: item.description && item.description._ ? item.description._ : item.description,
            link: item.link,
            guid: item.guid._,
            pubDate: item.pubDate,
            thumbnail: item['media:thumbnail'] ? item['media:thumbnail'].$.url : null
        }));

        return newsItems;
    } catch (error) {
        console.error('Error fetching or parsing the RSS feed:', error);
        throw error;
    }
}

async function fetchNYTNewsRSS() {
    try {
        const response = await axios.get('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');
        const rssData = response.data;

        const parser = new xml2js.Parser({ explicitArray: false, cdata: true });
        const result = await parser.parseStringPromise(rssData);

        const items = result.rss.channel.item;

        // Get the last 30 items
        const latestItems = items.slice(0, 60);

        // Save elements of each item
        const newsItems = latestItems.map(item => ({
            title: item.title && item.title._ ? item.title._ : item.title,
            description: item.description && item.description._ ? item.description._ : item.description,
            link: item.link,
            guid: item.guid._,
            pubDate: item.pubDate,
            thumbnail: item['media:content'] ? item['media:content'].$.url : null
        }));

        return newsItems;
    } catch (error) {
        console.error('Error fetching or parsing the RSS feed:', error);
        throw error;
    }
}

module.exports = { fetchBBCNewsRSS, fetchNYTNewsRSS };
