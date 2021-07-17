const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: String,
    pictures : [String],
    sizes : [String],
    price: Number,
    details: String,
    properties: [        
        Schema.Types.Mixed,
    ],
    material: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },

});

module.exports = Product = mongoose.model("products", productSchema);
