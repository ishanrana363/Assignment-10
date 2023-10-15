<<<<<<< HEAD
const workModels = require("../models/worksModel")

// work create

exports.workCreate = async (req,res)=>{
    try {
        let reqBody = req.body;
        reqBody.email = req.headers["email"];
        let result = await workModels.create(reqBody)
        res.status(201).json({
            status : "Success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// works read


exports.workRead = async (req,res) =>{
    try {
        let email = req.headers.email;
        let result = await workModels.find({email:email})
        res.status(201).json({
            status : "Success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// works update

exports.workUpdate = async (req,res)=>{
    try {
        let email = req.headers["email"]
        let id = req.body.id
        let query = {
            _id : id,
            email : email
        }
        let result = await workModels.updateOne(query,{
            title : req.body.title,
            classNote : req.body.classNote,
            description : req.body.description,
            status : req.body.status
        })
        res.status(201).json({
            status : "Success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// work delete

exports.workDelete = async (req,res)=>{
    try {
        let email = req.headers["email"];
        let id = req.body.id;
        let query = {
            _id : id,
        }
        let result = await workModels.deleteOne(query)
        res.status(201).json({
            status : "Success",
            data : result
        })
    }catch (e){

        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
=======
const worksModel = require("../models/worksModel")

// works create 

exports.createTask=async (req,res)=>{
    try{
        let reqBody=req.body
        reqBody.email=req.headers['email'];
        let result= await worksModel.create(reqBody)
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.deleteTask=async (req,res)=>{
    try {
        let id= req.params.id;
        let Query={_id:id};
        let result= await worksModel.deleteOne(Query)
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.updateTaskStatus=async (req,res)=>{
    try{
        let id= req.params.id;
        let status= req.params.status;
        let Query={_id:id};
        let reqBody={status:status}

        let result= await worksModel.updateOne(Query,reqBody)

        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.listTaskByStatus=async (req,res)=>{
    try {
        let status= req.params.status;
        let email=req.headers['email'];
        let result= await worksModel.find({email:email,status:status});
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
>>>>>>> 520b0bd4cfa4e19692679976dcf4a3d54094b802
    }
}



<<<<<<< HEAD


























=======
exports.taskStatusCount=async (req,res)=>{
    try {
        let email=req.headers['email'];
        let result= await worksModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}
>>>>>>> 520b0bd4cfa4e19692679976dcf4a3d54094b802
