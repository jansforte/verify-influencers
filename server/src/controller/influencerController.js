const {analyzeText} = require("../service/openaiService");
const {searchTwitter} = require("../service/twitterService");

//Consultamos los twitts del influencer y preguntamos a chatgpt
exports.processIncluencer = async (req, res, next) => {
    const { username } = req.query;
    try {
        const tweets = await searchTwitter(username);
        const healthClaims = await Promise.all(tweets.map(tweet => analyzeText(tweet.text)));
        res.json({ username, healthClaims });
    } catch (error) {
        next(error);
    }
}