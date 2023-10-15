const mongoose = require("mongoose")
require("dotenv").config()
const port = process.env.DB_PORT

const connectDB = ()=>{
    try {
        mongoose.connect(port)
        console.log('db is connect')
    }catch (e){
        console.log('db is not connect')
    }
}

module.exports = connectDB