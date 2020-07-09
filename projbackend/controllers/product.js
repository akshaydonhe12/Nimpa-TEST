const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs =require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error:"Product Not Found"
            });
        }
        req.product = product;
        next();
    });
};


exports.createProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error:"Problem with image"
            });
        }

//destrcture the fields
    const {name, description, price, category, stock,} = fields;

    if(
        !name || 
        !description ||
        !price || 
        !category ||
        !stock
     ){
       return res.status(400).json({
           error: "Please Include all fields"
       });
    }

    let product = new Product(fields);

//handle file here

    if (file.photo){
        if (file.photo.size > 3000000) {
            return res.status(400).json({
                error: "File size to big"
            });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }

 //save in  DB
 product.save((err, product) => {
    if (err) {
      res.status(400).json({
        error: "Saving tshirt in DB failed"
      });
    }
    res.json(product);
  });
});
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
};

//middleware

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
   next();
};

// delete controller

exports.deleteProduct= (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "faild to delete the Product"
            });
        }
        res.json({
            message:"Deletion was a success",
            deletedProduct
        });
    });
};


//update controller

exports.updateProduct= (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error:"Problem with image"
            });
        }
        
 //updation code

    let product = req.product;
    product =_.extend(product, fields)

//handle file here

    if (file.photo){
        if (file.photo.size > 3000000) {
            return res.status(400).json({
                error: "File size to big"
            });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }

 //save in  DB
 product.save((err, product) => {
    if (err) {
      res.status(400).json({
        error: "Updation of product failed"
      });
    }
    res.json(product);
  });
});
};

//product Listning

exports.getAllProducts = (req,res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";



  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error: "No product Found"
            });
        }
        res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct("category",{}, (err, category) =>{
        if(err){
            return res.status(400).json({
                error:"No Category found"
            });
        }
        res.json(category);
    });
};

//updateStock middleware

exports.updateStock = (req, res, next) => {
    
    let myOperations = req.body.order.produtcs.map(prod =>{
        return {
            updateOne :{
                filter: {_id: prod._id},
                update: {$inc:{stock: -prod.count, sold: +prod.count}}

            }
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) =>{
       if (err){
            return res.status(400).json({
            error: "Bulk Operation failed"
        })
    }
       next();
    });
} ;

