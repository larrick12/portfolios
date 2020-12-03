'use strict'
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main(cb){
    const Url = process.env.MONGO_URI;
    const client = new MongoClient(Url, {useNewUrlParser: true, useUnifiedTopology: true});

    try{
        await client.connect();
        await cb(client)
    } catch(e){
        console.log(e)
        throw new Error('cannot connect to database')
    }
}

module.exports = main