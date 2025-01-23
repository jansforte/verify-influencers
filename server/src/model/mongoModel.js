const {connectDB} = require("../config/mongoDB");
const {ObjectId} = require("mongodb");

//Estados de confidence: 1=Verified, 2:Questionable, 3:Debunked
exports.saveTweet = async (
    influencer, tweet, status, 
    confidence, date, isHealth=false, score=0) => {
    try {
        const db = await connectDB();
        const validate = await db.collection('claims')
                        .find({ influencer, tweet })
                        .toArray();
        
        if(validate.length===0 && tweet){
            const result = await db.collection('claims').insertOne({
                influencer,
                tweet,
                status,
                confidence,
                isHealth,
                score,
                date: new Date(date),
                createdAt: new Date(),
            });
            console.log('Afirmación guardada:', result.insertedId);
            return tweet;
        }
        return false;
    } catch (error) {
        console.error('Error al guardar la afirmación:', error.message);
        throw error;
    }
};

exports.getTweetByInfluencerAndTweet = async (influencer, tweet) => {
    try {
        const db = await connectDB();
        const claims = await db.collection('claims')
                        .find({ influencer, tweet })
                        .toArray();
        return claims;
    } catch (error) {
        console.error('Error al obtener afirmaciones:', error.message);
        throw error;
    }
};

exports.getTweetByInfluencer = async (filter) => {
    try {
        const db = await connectDB();
        const claims = await db.collection('claims')
                        .find(filter)
                        .toArray();
        return claims;
    } catch (error) {
        console.error('Error al obtener afirmaciones:', error.message);
        throw error;
    }
};

exports.updateClaimStatus = async (claimId, newStatus) => {
    try {
        const db = await connectDB();
        const result = await db.collection('claims').updateOne(
            { _id: ObjectId(claimId) },
            { $set: { status: newStatus, updatedAt: new Date() } }
        );
        console.log('Documentos actualizados:', result.modifiedCount);
        return result.modifiedCount;
    } catch (error) {
        console.error('Error al actualizar la afirmación:', error.message);
        throw error;
    }
};

//cuando estatus esta en 1 quiere decir que ya lo procesó openIA
exports.updateClaimIsHealth = async (influencer, claimId, isHealth) => {
    try {
        const db = await connectDB();
        const id = ObjectId.createFromHexString(claimId);
        const result = await db.collection('claims').updateOne(
            { influencer, _id: id},
            { $set: { isHealth: isHealth, updatedAt: new Date(), status: 1 } }
        );
        console.log('Documentos actualizados:', result.modifiedCount);
        return result.modifiedCount;
    } catch (error) {
        console.error('Error al actualizar la afirmación:', error.message);
        throw error;
    }
};

//cuando estatus esta en 2 quiere decir que ya lo procesó openIA
exports.updateClaimScore = async (influencer, claimId, confidence,score) => {
    try {
        const db = await connectDB();
        const id = ObjectId.createFromHexString(claimId);
        const result = await db.collection('claims').updateOne(
            { influencer, _id: id},
            { $set: { confidence:confidence,score: score, updatedAt: new Date(), status: 2 } }
        );
        console.log('Documentos actualizados:', result.modifiedCount);
        return result.modifiedCount;
    } catch (error) {
        console.error('Error al actualizar la afirmación:', error.message);
        throw error;
    }
};

exports.deleteClaim = async (claimId) => {
    try {
        const db = await connectDB();
        const result = await db.collection('claims').deleteOne({ _id: claimId });
        console.log('Afirmación eliminada:', result.deletedCount);
        return result.deletedCount;
    } catch (error) {
        console.error('Error al eliminar la afirmación:', error.message);
        throw error;
    }
};