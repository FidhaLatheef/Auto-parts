const mongoose = require('mongoose')

function connectDB(){

mongoose.set('strictQuery',false)
mongoose.connect("mongodb://0.0.0.0:27017/AutoParts").then(result=>{
     console.log("Database connected")
     console.log('http://localhost:8000')

}).catch ((err)=>{
    console.log("database error \n" +err)
})

}

module.exports=connectDB

