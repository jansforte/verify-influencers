const { TwitterApi } = require('twitter-api-v2');
const twitterToken = process.env.TWITTER_TOKEN;
const client = new TwitterApi(twitterToken);

module.exports = client;