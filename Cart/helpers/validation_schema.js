const Joi = require('@hapi/joi')

const cartSchema = Joi.object({
  product_id: Joi.string().required(),
  quantity: Joi.string().required(),
  color: Joi.array().required(),
  size: Joi.array().required(),
  user_id: Joi.array().required(),
})

module.exports = {
  cartSchema
}