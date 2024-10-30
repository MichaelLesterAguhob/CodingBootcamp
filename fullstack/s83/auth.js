const jwt = require('jsonwebtoken');
const secret = "MovieCatalogSystem";

module.exports.createToken = (user) => {
    const data = {
        _id: user._id,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
    }
    return jwt.sign(data, secret, {});
} 


module.exports.verifyUser = (req, res, next) => {
    let token = req.headers.authorization;
    if(typeof token === "undefined") {
        res.status(400).send({message: "Failed. No Token"})
    }
    token = token.slice(7, token.lenth);
    jwt.verify(token, secret, function(error, decodedToken) {
        if(error) {
            res.status(403).send({message: "Authentication Failed. Invalid Token"})
        } else {
            req.user = decodedToken;
            next();
        }
    })
}


module.exports.isAdmin = (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.status(403).send({
            Authentication: "Failed",
            message: "Action forbidden"
        })
    } else {
        next();
    }
}