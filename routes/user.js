const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const user = require("../models/user.js");

//SignUp or Register
router.route("/signup")
    .get( userController.renderSignUpForm )
    .post( wrapAsync(userController.signup) );

//Login
router.route("/login")
    .get( userController.renderLogInForm )
    .post( saveRedirectUrl
         , passport.authenticate("local", { failureRedirect : "/login", failureFlash: true })
         , userController.login );

//Logout
router.get("/logout", userController.logout);

module.exports = router;
