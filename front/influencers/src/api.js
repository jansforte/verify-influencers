import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia a la URL de tu backend

export const fetchClaims = async (influencer, claimText) => {
    const response = await axios.get(`${API_URL}/claims`, {
        params: { influencer, claimText },
    });
    return response.data;
};
