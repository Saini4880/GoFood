const express = require("express");
const router = express.Router();
const Order = require('../models/orders');
const User = require('../models/user');

router.post('/orderData', async (req, res) => {


    let data = req.body.order_data;

    let eid = await Order.findOne({ 'email': req.body.email });

    if (eid === null) {
        try {
            await Order.create({
                email: req.body.email,
                orderdate : req.body.order_date,
                orderdata: [data]
            }).then(() => {
                res.status(200).json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Error Message: " + error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate({ "email": req.body.email },
                { $push: { orderdata: data } }).then(() => {
                    res.status(200).json({ success: true });
                });
        } catch (error) {
            res.status(500).send("ServerError: " + error.message);
        }
    }
});

router.post('/myorderData', async (req, res) => {
try{
    let mydata= await Order.findOne({"email":req.body.email})
    res.json({orderdata: mydata})
}
catch(error){
    res.status(500).send("ServerError: " + error.message);
}
})

module.exports = router;
