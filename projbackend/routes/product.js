const express = require("express");
const router = express.Router();

const {
    getProductById, 
    createProduct, 
    getProduct, 
    photo,  
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");

const {
    isSigndIn, 
    isAuthenticated, 
    isAdmin
} = require("../controllers/auth");

const {getUserById} = require("../controllers/user");

//param
router.param("userId", getUserById);
router.param("productId", getProductById);


//actual route

//create route
router.post(
    "/product/create/:userId", 
    isSigndIn, 
    isAuthenticated, 
    isAdmin, 
    createProduct
    );

//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
    "/product/:productId/:userId",
    isSigndIn,
    isAuthenticated, 
    isAdmin, 
    deleteProduct
    );

//update route
router.put(
    "/product/:productId/:userId",
    isSigndIn, 
    isAuthenticated, 
    isAdmin, 
    updateProduct
    );


//listing route
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories)


module.exports = router; 