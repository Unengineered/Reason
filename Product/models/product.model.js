const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({

    store: String,
    name: String,
    pictures: [
        Schema.Types.Mixed,
        {
            background: String,
            url: String,
            color: String
        }
    ],
    sizes: [String],
    colors: [String],
    price: Number,
    details: String,
    properties:
        Schema.Types.Mixed,
    material: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },

});

module.exports = Product = mongoose.model("products", productSchema);
