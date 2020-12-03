require('dotenv').config();


const mailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth ={
    auth: {
        domain: process.env.DOMAIN,
        api_key: process.env.API_KEY
    }
}

const transporter = mailer.createTransport(mailGun(auth));

 const sendEMail = (username, subject, company, email, message, cb) => {

    const output = `
    <div>
        <p style="text-align: center; font-weight: bold; font-family: raleway; color: orangered"> You have a new contact request </p>
        <h3 style='background-color: #ccc; color: white; padding: 1em; font-family: raleway'>Client Details: </h3>
        <div style="padding: 1em; background-color: #eee; font-family: raleway">
            <ul type="none">
                <li>Name: ${username}</li>
                <li> Subject: ${subject}</li>
                <li> Company: ${company}</li>
                <li> Email: ${email}</li>
            </ul>
        </div>
        <div style="background-color: #232 color: white; font-family: raleway; padding: 1em">
            <h3 > Message: </h3>
            <p style="font-family: raleway; font-size: 14px; text-align: left; justify-content: center"> ${message} </p>
        </div>
        </div>
    `;

     const mailOptions = {
         sender: username,
         from: `Portfolio Contact <${email}>`,
         to: process.env.EMAIL,
         subject,
         html: output
     };
     transporter.sendMail(mailOptions, function(err, data){
         if(err){
            return cb(err, null)
         }else{
             cb(null, data)
         }
     })

}

module.exports = sendEMail