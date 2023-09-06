const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    modelName:{
        type:String,
        required:true
    },
    categoryName: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }]
});

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;
