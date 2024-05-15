const timestamps = require('mongoo/lib/plugins/timestamps');
const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        default: 0
    },
    price: {
        type: Number,
        require: true,
        default: 0
    },

},
    {
        timestamps: true
    }
);

const Product = mongoose.model("products",ProductSchema);
module.exports = Product;