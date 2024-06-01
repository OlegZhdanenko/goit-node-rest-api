import "dotenv/config";
import nodemailer from "nodemailer" ;


const transport= nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io",
    port:2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    }
});

// const message={
//     to:"olegzhdan1988@gmail.com",
//     from:"olegzhdan1988@gmail.com",
//     subject:"",
//     html:`<h1 style ="color:red">Please verification</h1>`,
//     text:`Please verification`
// };
function sendMail(message){
    return   transport.sendMail(message)
};
export default {sendMail}