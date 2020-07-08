const express = require("express");
const router = express.Router();

const { isSigndIn,isAuthenticated } = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getToken, processPayment} = require ("../controllers/paymentB");

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSigndIn, isAuthenticated, getToken);
router.post("/payment/braintree/:userId", isSigndIn, isAuthenticated, processPayment);
module.exports = router;