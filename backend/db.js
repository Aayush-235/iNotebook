const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/";

const connectToMongo = () => {
  mongoose.connect(mongoURL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
    });
};

module.exports = connectToMongo;
