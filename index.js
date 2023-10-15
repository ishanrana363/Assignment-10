// Basick Lib Import
const express = require("express")
const app = express()
const router = require("./src/routes/api")

// Security Middleware Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors")
const morgan = require("morgan");

// Database Lib Import
const mongoose = require("mongoose")

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(morgan("dev"))

// Express Json Implement
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Request Rate Limit

const limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// router implement

app.use("/api/v1/",router)


// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({
        status : "Fail",
        data : "Not Found Route"
    })
})


module.exports = app