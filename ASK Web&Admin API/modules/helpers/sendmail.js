'use strict';
const sgMail = require('@sendgrid/mail');
let config = process.config.global_config
sgMail.setApiKey(config.SENDGRID_API_KEY);
const fs = require("fs");
let sendMail = async (to, subject, htmlData, cc = [], attachment = []) => {
    try { 
        to = to.split(",")
    let msg = {}
    if (attachment.length > 0) {
        
        let path = fs.readFileSync(attachment[0].path).toString("base64");
        
        let attachments = [
            {
                content: path,
                filename: attachment[0].originalname,
                type: attachment[0].mimetype,
                disposition: "attachment"
            }
        ]


        msg = {
            to: to,
            subject: subject,
            html: htmlData,
            from: "info@allsouthflooring.com",
            cc: cc,
            attachments: attachments
        };
    } else {
        msg = {
            to: to,
            subject: subject,
            html: htmlData,
            from: "info@allsouthflooring.com",
            cc: cc
        };
    }
    
        let result = await sgMail.send(msg);
        return result;
    } catch (error) {
        console.log(error.response.body.errors);
        return error;
    }


}


module.exports = { sendMail }