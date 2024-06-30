const {MongoClient, ObjectId} = require('mongodb');
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
    await users.updateOne({email}, {$set: {refreshToken: refreshToken}});
}

module.exports.chackRefreshToken = async (refreshToken) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.findOne({refreshToken});
    return result.email;
}

module.exports.people = async (refreshToken) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.find({refreshToken: {$ne: refreshToken}}).project({name: 1, personalFotoName: 1}).toArray();
    return result;
}

module.exports.userInf = async (refreshToken) =>{
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.find({refreshToken}).project({name: 1, personalFotoName: 1}).toArray();
    return result;
}

module.exports.peopleCard = async (id) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.find({_id: new ObjectId(id)}).project({name: 1, personalFotoName: 1, date: 1}).toArray();
    return result[0];
}

module.exports.accountFotoCheck = async (refreshToken) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.findOne({refreshToken});
    return result.personalFotoName;
}

module.exports.accountUpdate = async (refreshToken, data) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.updateOne({refreshToken}, {$set: data});
    return result;
}

module.exports.delteRefreshToken = async (refreshToken) => {
    const client = await start();
    const users = await client.db("testDB").collection('users');
    const result = await users.updateOne({refreshToken}, {$set: {refreshToken}});
}
