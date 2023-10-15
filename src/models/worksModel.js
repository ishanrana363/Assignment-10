const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({
    title : {
        type : String
    },
    classNote : {
        type : String
    },
    description : {
        type : String
    },
    status : {
        type : String
    },
    email : {
        type : String
    }
},{timestamps:true,versionKey:false})

const worksModel = mongoose.model("worksData",dataSchema)
module.exports = worksModel

















