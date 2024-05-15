const express = require("express");
const router = express.Router();
const Product = require('../models/product.model');
const {getProducts, getProduct, addProduct} = require('../controller/product.controller')



router.get('/',getProducts);

router.get('/:id',getProduct);

router.post('/',addProduct);


module.exports = router;