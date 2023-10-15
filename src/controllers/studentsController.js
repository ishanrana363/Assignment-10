const studentsModel = require("../models/studentsModel");
const sentEmailUtility = require("../utility/sendEmailUtility");
const otpModel = require("../models/otpModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
require("dotenv").config()

// student account create

exports.create = async (req,res) =>{
    try {
        let reqBody = req.body
        let result = await studentsModel.create(reqBody)
        res.status(201).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}


// account login

exports.login = async (req,res)=>{
    try {
        let secreatKey = process.env.SECREATE_KEY
        let reqBody = req.body
        let result = await studentsModel.find(reqBody).count()
       if(result===1){
           let Payload = {
               exp : Math.floor(Date.now()/1000) + (24*60*60),
               data : reqBody["email"]
           };
           const Token = jwt.sign(Payload,secreatKey)
           res.status(201).json({
               status : "success",
               data : Token
           })
       }else {
            res.status(401).json({
                status : "unauthorized"
            })
       }
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// profile read

exports.profileRead = async (req,res)=>{
    try {
        let email = req.headers["email"];
        let result = await studentsModel.find({email:email});
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// profile update

exports.profileUpdate = async (req,res)=>{
    try {
        let email = req.headers["email"];
        let result = await studentsModel.updateOne({email:email},{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            mobile : req.body.mobile,
            password : req.body.password,
            address : req.body.address,
            roll : req.body.roll,
            class : req.body.class
        })
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// profile delete

exports.profileDelete = async (req,res) =>{
    try {
        let email = req.headers["email"];
        let id = req.body._id
        let query = {
            _id : id,
            email :email
        }
        let result = await studentsModel.deleteOne(query)
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

// email verify

exports.recoveryVerifyEmail = async (req,res) =>{
    try {
        let email = req.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 100000 );
        let emailText = "Task Manager Verification  code is = "+otpCode;
        let emailSubject = "Your Verification Code Is"
        let result = await studentsModel.find({email:email}).count();
        if(result===1){
            await sentEmailUtility(email,emailText,emailSubject);
            await otpModel.create({email:email,otp:otpCode});
            res.status(200).json({
                status : "success",
                data : "Verification code sent successfully"
            })
        }else {
            res.status(401).json({
                status:"fail"
            })
        }

    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

//recoveryVerifyOtp

exports.recoveryVerifyOtp = async (req,res)=>{
    try {
        let email = req.params.email;
        let otpCode = req.params.otp;
        let statusUpdate = 1
        let result = await otpModel.find({email:email,otp:otpCode}).count();
        if(result===1){
            await otpModel.updateOne({email:email,otp:otpCode},{status:statusUpdate});
            res.status(200).json({
                status : "success",
                data : " 6 Digit OTP Verification successfully"
            })
        }else {
            res.status(401).json({
                status : "fail"
            })
        }
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }
}

//recovery reset password

exports.recoveryResetPassword = async (req,res) =>{
    try {
        let email = req.body.email;
        let otpCode = req.body.otp;
        let newPassword = req.body.password;
        let result = await otpModel.find({email:email,otp:otpCode}).count();
        if(result===1){
            await studentsModel.updateOne({email:email},{password:newPassword})
            res.status(200).json({
                status : "success",
                data : "Password reset successfully"
            })
        }else {
            res.status(401).json({
                status : "Fail"
            })
        }
    }catch (e){
        res.status(500).json({
            status: "Error",
            message: "An error occurred while processing your request."
        });
    }

}























































