const express = require('express')
const nodemailer = require("nodemailer")
const data = require("./routes/data")
const app = express()

const port = process.env.PORT || 5000

// yrli xpvc xuyw pnov
// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 
app.get("/",data)
app.get('/:Email/:pass/:user/:subject/:message' , (req , res)=>{
  let email=req.params.Email
  let password=req.params.pass
  let user=req.params.user
  let message=req.params.message
  let subject=req.params.subject
  console.log(email)
  const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'Gmail' or use your own SMTP server
      auth: {
        user: email, // your email address
        pass:password  // your email password or an app-specific password
      }
    });
  const mailOptions = {
      from: email, // sender's email address
      to: user, // recipient's email address
      subject: subject,
      html: `${message}`
    };
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.send(error)
        res.end()
      } else {
          
          res.send(info)
          res.end()
      }
  });

  // res.end()
          
 

})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))