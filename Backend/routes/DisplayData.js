const express = require("express");
const router = express.Router();

router.post('/fooddata',(req,res)=>{
    try{
        res.send([global.food_items, global.food_cat])
    }
    catch{
        console.error(error.message)
        res.send("Server Message")
    }
})

module.exports = router