"use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail=async function sendMail(str,data){
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'noemie.wyman@ethereal.email',
        pass: 'YnFSAWfAedwjBfpMUD'
    }
});
      
      var subject0,html0;
      if(str=='signup'){
        subject0="Thank You for Signing Up";
        html0=`<h1>Welcome to NotesApp</h1>
        <h2>We hope that you make the most out of this service</h2><h3>Here are your details we received:</h3><h3>Name - ${data.name}</h3><h3>Email - ${data.email}</h3>`
      }
      else{
        subject0="Reset your Password",
        html0=`<h1>Change your password</h1>
        <h2>Please find below the link to reset your password</h2>
        <h3><a>${str}</a></h3>
        <h3>If not done by you forward this email to beingsonkar@gmail.com</h3>`
      }
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"dynamicHarsh 👻" <jamison.halvorson@ethereal.email>', // sender address
          to: data.email, // list of receivers
          subject: subject0, // Subject line
          text: "", // plain text body
          html: html0, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        
      }
      
      main().catch(console.error);

}


