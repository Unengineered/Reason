const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({

    name: String,
    logo: String,
    banner: String,
    banner_product: String,
    store_picture: String,
    sections: [
        Schema.Types.Mixed,
        {
            name: String,
            type: String,
            products: [
                Schema.Types.Mixed,
                {
                    name : String,
                    price : Number,
                    thumbnail : String,
                    product_id : String,
                    background_color: String
                }
            ]
        }

    ],
    about: String,
    socials: {
        instagram: String,
        facebook: String,
        twitter: String
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
}
);

module.exports = Store = mongoose.model("stores", StoreSchema);
