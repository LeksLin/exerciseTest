const {MongoClient} = require('mongodb');
const hashedPassword = require('../middleware/hashPassword');

const client = new MongoClient('mongodb://localhost:27017/testDB');


const start = async () => {
    try {
        return client.connect();
    }catch (e){
        console.log(e);
    }
}

module.exports.registration = async (data) => {
    data.password = await hashedPassword.hashPassword(data.password);
    data.refreshToken = "";
    
    const client = await start();
    const users = await client.db().collection('users');
    users.insertOne(data);
}

module.exports.authorization = async (email) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.find({email}).toArray();
    return result;
}

module.exports.saveRefreshToken = async (email, refreshToken) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    await users.updateMany({email}, {$set: {refreshToken: refreshToken}});
}

module.exports.chackRefreshToken = async (refreshToken) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.find({refreshToken}).toArray();
    return result[0].email;
}