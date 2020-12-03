'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const appRoute = require('./routes/route.js');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const myDB = require('./conn');
const sendEMail = require('./mail');
const crypt = require('crypto');


// const mailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

app.set('view engine', 'pug')
app.set('views', path.join(__dirname , 'views'))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper/dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.disable("x-powered-by")

// const nonces = function(length = 32){
//     let nonce = "";
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for(let i=0; i < length; i++){
//         nonce += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return nonce
// }

const nonce = crypt.randomBytes(16).toString('hex');

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", `nonce-${nonce}`, "'unsafe-eval'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com']
       
    }
}));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


// const authen = new OAuth2({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: process.env.AUTH_URI
// })

// authen.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN
// })

// const accessToken = authen.getAccessToken()

const dbName = process.env.DBNAME;
const collect = process.env.DB_COLLECTION

myDB(async client => {
    const myData = await client.db(dbName).collection(collect)


    appRoute(app, myData, sendEMail)

}).catch(e => {
    app.route('/').get((req, res) => {
        res.send(e)
    })
})


http.listen(process.env.PORT || 3000, () => {
    console.log('listenning to port ' + process.env.PORT)
})