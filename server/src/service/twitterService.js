const client = require("../config/twitter");

exports.searchTwitter = async(username)=>{
    
    const {data} = await client.v2.search(
        `from:${username}`);
    console.log(data);
    // Consume every possible tweet of jsTweets (until rate limit is hit)
    // for await (const tweet of data.data) {
    //     console.log(tweet.text);
    // }

    return data.data;
}
