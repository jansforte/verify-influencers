import React from 'react';

const ClaimsList = ({ claims }) => {
    if (claims.length === 0) {
        return <p>No se encontraron resultados.</p>;
    }

    return (
        <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>Influencer</th>
                    <th>Claim</th>
                    <th>Estado</th>
                    <th>Confianza</th>
                </tr>
            </thead>
            <tbody>
                {claims.map((claim) => (
                    <tr key={claim._id}>
                        <td>{claim.influencer}</td>
                        <td>{claim.claim}</td>
                        <td>{claim.status}</td>
                        <td>{claim.confidence}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClaimsList;
