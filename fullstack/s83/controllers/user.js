const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');

module.exports.register = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    await newUser.save().then(result => {
        if(result) {
            res.status(201).send({message: "Registered successfully"})
        } 
    }).catch(error => consle.error(error));
}


module.exports.login = async(req, res) => {
    await User.findOne({email: req.body.email}).then(result => {
        if(!result) {
            return res.status(404).send({message: "Email does not found!"})
        }
        const isPassCorrect = bcrypt.compareSync(req.body.password, result.password);
        if(isPassCorrect) {
            return res.status(200).send({access: auth.createToken(result)});
        } else {
            res.status(409).send({message: "Incorrect email or password"});
        }
    })
    .catch(error => console.error(error));
}