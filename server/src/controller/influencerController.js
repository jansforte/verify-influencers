const {analyzeText,verifyClaim} = require("../service/openaiService");
const {searchTwitter} = require("../service/twitterService");
const {saveTweet,getTweetByInfluencer,
     updateClaimIsHealth, updateClaimScore
} = require("../model/mongoModel");

const depuraTweet = async(username,data)=>{
    await Promise.all(data.map(tweet => saveTweet(username,tweet.text,0,0,tweet.created_at)));
    const result = await getTweetByInfluencer({influencer:username, status:0});
    // const depurado = result.map(item => ({
    //                             claimId:`${item._id}`,
    //                             tweet: `${item.tweet}`
    //                         }));
    
    return depureToItem(result);
}

const addIsHealth = async(username,data)=>{
    await Promise.all(
        data.map(tweet => updateClaimIsHealth(username,tweet.claimId,tweet.isHealth))
    );
}

const depureToItem = (result)=>{
    const depurado = result.map(item => ({
        claimId:`${item._id}`,
        tweet: `${item.tweet}`
    }));
    return depurado.length>0 ? JSON.stringify(depurado) : false;
}

const addScore = async(username,data)=>{
    await Promise.all(
        data.map(tweet => updateClaimScore(username,tweet.claimId,tweet.confidence,tweet.score))
    );
}

//Consultamos los twitts del influencer y preguntamos a chatgpt
exports.processIncluencer = async (req, res, next) => {
    const { username, start_time, end_time} = req.query;
    try {
        const tweets = await searchTwitter(username,start_time, end_time);
        let realTweets = false;
        if(tweets){
            realTweets = await depuraTweet(username,tweets);
        }

        if(realTweets){
            //Analizamos el texto con Open IA para verificar si es de salud o no
             const data = await analyzeText(realTweets);
            // console.log(data);
             const dataHealthClaims =JSON.parse(data);
            //Actualizamos los tweets para discriminar entre tweets de salud y los que no
            await addIsHealth(username,dataHealthClaims);
        }

        //Obtenemos los tweets que son de salud y no están verificados
        const m_data = await getTweetByInfluencer({influencer:username,isHealth:true,confidence:0});
        const depurado = depureToItem(m_data);
        //Realizamos verificación en revistas si existen
        if(depurado){
            const dataVerify = await verifyClaim(depurado);
            const newData =JSON.parse(dataVerify);
            await addScore(username,newData);
        }

        const filter = {influencer:username,
            isHealth:true,
            confidence:{ $ne: 0 }
        };

        if (start_time) {
            filter.date = { ...filter.date, $gte: new Date(start_time) };
        }
        if (end_time) {
            filter.date = { ...filter.date, $lte: new Date(end_time) };
        }

        //Consultamos la información solicitada del frontend
        const healthClaims = await getTweetByInfluencer(
            filter
            );
        if(healthClaims){
            res.status(200).json({username: username, data: healthClaims, count: healthClaims.length});
        }
        else{            
            res.status(200).json({username: username, data: "no se encontraron tweets", count: 0});
        }
    } catch (error) {
        next(error);
    }
}