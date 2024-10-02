const jwt = require("jsonwebtoken");
require('dotenv').config();

// [Section] JSON Web Tokens
/*
- JSON Web Token or JWT is a way of securely passing information from the server to the client or to other parts of a server
- Information is kept secure through the use of the secret code
- Only the system that knows the secret code that can decode the encrypted information
- Imagine JWT as a gift wrapping service that secures the gift with a lock
- Only the person who knows the secret code can open the lock
- And if the wrapper has been tampered with, JWT also recognizes this and disregards the gift
- This ensures that the data is secure from the sender to the receiver
*/

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
}

// Token Verification and Decryption
module.exports.verify = (req, res, next) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization;

    if(typeof token === 'undefined') {
        return res.send({ auth: "Failed. No Token" })
    } else {
        console.log(token);
        token = token.slice(7, token.length);
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodedToken){
            if(err) {
                return res.send({
                    auth: "Failed",
                    message: err.message
                }) 
            } else {
                console.log("result from verify method:");
                console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        })
    }
}

module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next();
    } else {
        return res.send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}