const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");
require("dotenv").config()
let password = process.env.SMTP_PASS;
let sentEmailUtility = async (emailTo,emailText,emailSub) =>{
    let transporter = nodemailer.createTransport(
        smtpTransporter({
            service : "Gmail",
            auth : {
                user : "ishanrana094@gmail.com",
                pass : password
            }
        })
    );
    let mailOption = {
        from : "ishanrana094@gmail.com",
        to : emailTo,
        subject : emailSub,
        text : emailText
    }
    return transporter.sendMail(mailOption)
}

module.exports = sentEmailUtility















