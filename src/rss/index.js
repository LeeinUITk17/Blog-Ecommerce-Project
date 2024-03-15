const Parser = require('rss-parser');
const feedUrl = "https://vnexpress.net/rss/tin-moi-nhat.rss";
const parser = new Parser();

const parse = async (url) => {
    try {
        const feed = await parser.parseURL(url);
        console.log(`Feed Title: ${feed.title}`);
        
        feed.items.forEach((item) => {
            console.log(item.title);
        });
    } catch (error) {
        console.error('Error parsing RSS feed:', error.message);
    }
};

parse(feedUrl);
