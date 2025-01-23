const client = require("../config/twitter");

exports.searchTwitter = async(username,start_time,end_time)=>{
    
    const params = {
        'tweet.fields': 'created_at'
    }

    if (start_time) {
        params['start_time'] = new Date(start_time).toISOString() ;
    }
    if (end_time) {
        params['end_time'] =  new Date(end_time).toISOString() ;
    }

    const {data} = await client.v2.search(
        `from:${username}`,params);
    
    console.log(data?.data);
    console.log(data?.data?.created_at);
    // const outputArray = data?.data?.map(item => ({
    //     role: 'user',
    //     content: `Identifica afirmaciones de salud en el siguiente texto:\n${item.text}`
    // }));

    return data?.data || false;
}
