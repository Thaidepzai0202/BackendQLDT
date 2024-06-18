const mongoose = require('mongoose');
// const timestamps = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    imagePath: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        unique: true
    },
    createdAt: { type: Date, default: Date.now }
});

ProductSchema.pre("save", async function (next) {
    const lastProduct = await this.constructor.findOne().sort({ createdAt: -1 });
    const lastID = lastProduct ? lastProduct.productID : 'product0000000';
    const idNumber = parseInt(lastID.replace('product', ''), 10) + 1;
    this.productID = 'product' + idNumber.toString().padStart(7, '0');
    
    next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
