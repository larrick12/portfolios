require('dotenv').config();


const mailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth ={
    auth: {
        domain: 'sandboxbe3c519c72a8403996aa2623f94d564f.mailgun.org',
        api_key: 'a002ad7b6adaccc3772771ecfa6c57cb-360a0b2c-f1c23100'
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