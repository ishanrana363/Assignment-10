const jwt = require("jsonwebtoken")
require("dotenv").config()
const secreatKey = process.env.SECREATE_KEY
module.exports = async (req,res,next)=>{
    let Token = req.headers["token"]
    jwt.verify(Token,secreatKey,(error,decoded)=>{
        if (error){
            res.status(401).json({
                status : "unauthorized"
            })
        }else {
            let email = decoded["data"];
            console.log(email);
            req.headers.email = email;
            next()
        }
    })
}