const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
})
.then(() => console.log("MongoDB server is connected"))
.catch((err) => console.error("Error in MongoDB server", err));

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log("MongoDB server is disconnected");
});

module.exports = db;