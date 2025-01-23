import React, { useState } from 'react';
import ClaimSearch from './components/ClaimSearch';
import ClaimsList from './components/ClaimsList';
import { fetchClaims } from './api';

const App = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (influencer, claimText) => {
        setLoading(true);
        try {
            const results = await fetchClaims(influencer, claimText);
            setClaims(results);
        } catch (error) {
            console.error('Error fetching claims:', error);
            alert('Error al obtener resultados');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Buscar Claims de Influencers</h1>
            <ClaimSearch onSearch={handleSearch} />
            {loading ? <p>Cargando...</p> : <ClaimsList claims={claims} />}
        </div>
    );
};

export default App;
