const { Configuration, OpenAI } = require('openai');

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
}

const openai = new OpenAI(configuration);

module.exports = openai;