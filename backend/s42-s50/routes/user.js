// [SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");
const passport = require('passport');
const { isLoggedIn } = require('../auth');

const { verify } = require("../auth");

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/check-email", userController.checkEmailExists);

router.post("/details", verify, userController.getProfile);

router.post('/enroll', verify, userController.enroll);

router.get('/get-enrollments', verify, userController.getEnrollments);

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account'
  }));
  
  router.get('/google/callback', 
        passport.authenticate('google', {
            failureRedirect: '/users/failed'
        }), 
        function(req, res) {
                res.redirect('/users/success');
        }
    );
  
  router.get('/failed', (req, res) => {
    console.log('User is not authenticated');
    res.send('Failed');
  });
  
  router.get('/success', isLoggedIn, (req, res) => {
    console.log('You are logged in');
    res.send(`Welcome ${req.user.displayName}`);
  });

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log('Error while destroying session: ', err);
        } else {
            req.logout(() => {
                console.log('You are logged out');
                res.redirect('/');
            })
        }
    })
  })


  router.put('/reset-password', verify, userController.resetPassword);

  router.put('/profile', verify, userController.updateProfile);

module.exports = router;
