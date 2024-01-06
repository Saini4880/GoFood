const mongoose = require("mongoose");

const mongoURL = "mongodb://0.0.0.0:27017/MernApp";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    const fetchedDataCollection = mongoose.connection.db.collection("GoFood");
    const data = await fetchedDataCollection.find({}).toArray();
    
    const fetchedFoodCatagory = mongoose.connection.db.collection("FoodCatagory");
    const catData = await fetchedFoodCatagory.find({}).toArray();

    global.food_items=data;
    global.food_cat=catData;
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
