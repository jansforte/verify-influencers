import React, { useState } from 'react';

const ClaimSearch = ({ onSearch }) => {
    const [influencer, setInfluencer] = useState('');
    const [claimText, setClaimText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(influencer, claimText);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <div>
                <label>Influencer:</label>
                <input
                    type="text"
                    value={influencer}
                    onChange={(e) => setInfluencer(e.target.value)}
                    placeholder="Nombre del influencer"
                    style={{ marginLeft: '10px' }}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Claim:</label>
                <input
                    type="text"
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    placeholder="Texto del claim"
                    style={{ marginLeft: '10px' }}
                />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Buscar</button>
        </form>
    );
};

export default ClaimSearch;
