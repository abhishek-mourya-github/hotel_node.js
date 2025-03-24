const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL)
.then(() => console.log("MongoDB server is connected"))
.catch((err) => console.error("Error in MongoDB server", err))

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log("MongoDB server is disconnected");
} )

module.exports = db;