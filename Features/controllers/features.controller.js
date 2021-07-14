const clothings = ["Shirts", "jeans", "skirts", "T-shirts"]
const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray"]
const materials = ["Silk", "Cotton", "Velvet", "Polyster"]

module.exports = {
    features: async (req, res, next) => {
        try {

            const features = {
                clothings, colors, materials
            }
            res.send(features)  

        } catch (error) {
            next(error)
        }

    }
}