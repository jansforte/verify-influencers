const openai = require("../config/openAI");

const analyzeText = async (text) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Identifica afirmaciones de salud en el siguiente texto:\n${text}`,
            max_tokens: 500,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error analyzing text:', error.message);
        throw error;
    }
};

const verifyClaim = async (claim) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Verifica la siguiente afirmación de salud con fuentes científicas confiables:\n"${claim}"\nDevuelve si es "Verificado", "Cuestionable" o "Desmentido" y un puntaje de confianza del 1 al 100.`,
            max_tokens: 200,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error verifying claim:', error.message);
        throw error;
    }
};

module.exports = { analyzeText, verifyClaim };