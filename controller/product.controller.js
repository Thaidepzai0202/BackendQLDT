const Product = require('../models/product.model');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndUpdate({ name: id }, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }
        const updateProduct = await Product.find({ name: id });
        res.status(200).json({ updateProduct });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    getProducts,
    getProduct,
    addProduct
}