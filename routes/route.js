
module.exports = function(app, myData, sendEMail){

    const allowedOrigin = [/^https?:\/\/([\w-]+\.)*googleapis.com/, /^http:\/\/localhost:\d+/];
    
    app.use(function(req, res, next){
        const origin = req.get('origin');
        if(allowedOrigin.some(regex => regex.test(origin))){
            res.header("Access-Control-Allow-Origin", origin)
        }
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, content-Type, Accept")
        
        res.header("Access-Control-Allow-Credentials", true)
        next()
    })

    app.route('/').get((req, res)=> {
        res.render('index')
    })

    app.route('/contact').post((req, res, next) => {
        let { username, email, message, subject, company } = req.body;

        sendEMail(username, subject, company, email, message, function(err, data){
            if(err){
                return msg = 'Internal error message not sent';
            }else{
                console.log(data)
                return msg = "message delivered successfully";
            }
        })

            myData.findOne({username}, (err, user) => {
                if(err){ 
                    return next(err);
                } else if(user){
                    res.redirect('/')
                } else {
                    myData.insertOne({username, email, subject, message, company}, (err, docs) => {
                        if(!err){ 
                            return next(null, docs.ops[0]);
                        }
                    })
                }
            })
    }, 
        (req, res, next) => {
           res.redirect('/')
       }
    )

    app.use((req, res, next) => {
        res.render('error', {msgs: 'Request page not found'})
        
    })
}