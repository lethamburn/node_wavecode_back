const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/back-api';

const connect = async() => {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to BBDD');
    } catch (error) {
        console.log('Error to connect to BBDD, error info --> ', error)
    }
}

module.exports = {
    DB_URL,
    connect
}