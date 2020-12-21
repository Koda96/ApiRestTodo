import MongoClient from 'mongodb'

export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb+srv://admin:admin@apilab.dgm0o.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('nodejs-restapi');
        console.log('Connected to DB');
        return db;
    } catch(e) {
        console.log(e);
    }
};