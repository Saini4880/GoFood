const express = require ('express')
const app = express()
const port = 5000
const mongoose=require('mongoose')
const mongoDB=require('./db')
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.use(express.json());
app.use('/api',require("./routes/createuser"));
app.use('/api',require("./routes/DisplayData")); 
app.use('/api',require("./routes/orderData")); 
app.listen(port,()=>{
    console.log("App is running or port 5000")
})