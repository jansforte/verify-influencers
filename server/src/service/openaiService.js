const openai = require("../config/openAI");

const analyzeText = async (tweets) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'developer',
                    content: `según al siguiente array JSON: ${tweets} .
                    quiero que valides cada key "tweet" si identificas afirmaciones de salud 
                    y solo respondeme con el array con un key más denominado "isHealth" donde pondras en valor boolean
                    si identificaste afirmación de salud`
                }
            ],
            max_tokens: 1100,
        });
        return response.choices[0].message.content.trim().replace(/^```json\n/, '').replace(/```/,'');
    } catch (error) {
        console.error('Error analyzing text:', error.message);
        throw error;
    }
};

const verifyClaim = async (tweets) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role:'developer',
                content:`según al siguiente array JSON: ${tweets} .
                Verifica cada key "tweet" con fuentes científicas confiables,
                y solo respondeme con el array con dos key más denominado "confidence" y "score". Para "confidence" pondrás un valor de 1 a 3, 
                siendo 1 si es "Verified", 2 si es "Questionable" y 3 si es "Debunked";
                Para "score" asigna un puntaje de confianza del 1 al 100. Recuerda los valores lo asignas segun lo investigado con fuentes científicas y solo respondeme con el array sin explicación`}],

            max_tokens: 1100,
        });
        return response.choices[0].message.content.trim().replace(/^```json\n/, '').replace(/```/,'');
    } catch (error) {
        console.error('Error verifying claim:', error.message);
        throw error;
    }
};

module.exports = { analyzeText, verifyClaim };