const express = require("express");
const router = express.Router();

const {
    isSigndIn, 
    isAuthenticated, 
    isAdmin
} = require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");

const{getOrderById, createOrder, getAllOrders,getOrderStatus,updateStatus }= require("../controllers/order");

//params
 router.param("userId", getUserById);
 router.param("orderId", getOrderById);




//actual route

//create route
router.post(
    "/order/create/:userId",
    isSigndIn, 
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
  );

 // read route
router.get("order/all/:userId",
 isSigndIn, 
isAuthenticated,
isAdmin,
getAllOrders,

);

//status Of Order
router.get(
  "/order/status/:userId",
  isSigndIn, 
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  "order/:orderId/status/:userId", 
isSigndIn, 
isAuthenticated, 
isAdmin, 
updateStatus
);


module.exports = router;