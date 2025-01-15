const client = require("../config/twitter");

exports.searchTwitter = async(username)=>{
    
    const jsTweets = await client.v2.search(
        `from:${username} -is:retweet`);
    // Consume every possible tweet of jsTweets (until rate limit is hit)
    for await (const tweet of jsTweets) {
        console.log(tweet);
    }

    return jsTweets;
}
