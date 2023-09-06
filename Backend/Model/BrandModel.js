const mongoose=require('mongoose');
const brandSchema=new mongoose.Schema({
    brandName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
const BrandModel = new mongoose.model("Brand",brandSchema);
module.exports=BrandModel;