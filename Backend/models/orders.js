const mongoose = require ('mongoose')

const {Schema} = mongoose;

const orderSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        orderdata: {
            type: Array,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    },
);

module.exports = mongoose.model('Order',orderSchema)
