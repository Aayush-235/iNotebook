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



//2nd way

// const mongoose = require('mongoose');

// const mongoURI = "your_mongo_connection_string";

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err);
//   }
// };

// module.exports = connectToMongo;
