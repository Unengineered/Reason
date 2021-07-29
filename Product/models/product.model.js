const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({

    store: String,
    name: String,
    thumbnail: {
        url: String,
        background:String
    },
    pictures: Schema.Types.Mixed,
    sizes: [        
        Schema.Types.Mixed,
        {
            unselected: String,
            selected : String
        }
    ],
    colors: [
        Schema.Types.Mixed,
        {
            color: String,
            name: String
        }
    ],
    price: Number,
    details: String,
    properties:[  
        Schema.Types.Mixed,
        {
            property: String,
            description: String
        }
    ],
    quick_info: [String],
    created_at: {
        type: Date,
        default: Date.now(),
    },

});

module.exports = Product = mongoose.model("products", productSchema);
