const express = require ("express");
const router = express.Router();

const {
    getCategoryById, 
    createCategory,
    getCategory,
    getAllCategory, 
    updateCategory,
    removeCategory
} = require("../controllers/category");

const {isSigndIn, isAuthenticated , isAdmin} = require("../controllers/auth");
const {getUserById } = require("../controllers/user");

//param
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual Routes

//create route 
router.post(
    "/category/create/:userId", 
    isSigndIn, 
    isAuthenticated , 
    isAdmin, 
    createCategory
);

//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory );

//update route
router.put(
    "/category/:categoryId/:userId",
     isSigndIn, 
     isAuthenticated ,
     isAdmin, 
     updateCategory
);


//delete route 
router.delete(
    "/category/:categoryId/:userId",
     isSigndIn, 
     isAuthenticated ,
     isAdmin, 
     removeCategory
);

module.exports = router;