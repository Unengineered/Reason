const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: String,
    logo: String,
    featured_picture : String,
    featured_product : String,
    sections: [
        Schema.Types.Mixed,
        {
            name: String,
            type: String,
            products: [
                {
                    picture : String,
                    product_id : String,
                    background: String
                }
            ]
        }

    ],
    about: String,
    socials: {
        instagram : String,
        facebook: String
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Store = mongoose.model("stores", StoreSchema);
