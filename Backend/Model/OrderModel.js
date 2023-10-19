const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: String,
    orderId: String,
    cartItem: [
        {
            id: String,
            productname: String,
            image: String,
            price: String,
            quantity: Number,
            status:String
        }
    ],
    billingDetails:
    {
        name: String,
        country: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: String,
        mobile: String,
        email: String,
    },
    shippingDetails:
    {
        name: String,
        country: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: String,
        mobile: String,
        email: String,
    },
    total: Number,
   

})

const OrderModel = new mongoose.model("Order", orderSchema);

module.exports = OrderModel;