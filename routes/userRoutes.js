const express = require("express");

const router = express.Router();

//USER CONTROLLERS
const { loginUser, signupUser } = require("../controllers/userController");

//LOGIN ROUTE
router.post("/login", loginUser);

//SIGNUP
router.post("/signup", signupUser);

module.exports = router;
