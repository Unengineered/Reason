const Joi = require('@hapi/joi')

const storeSchema = Joi.object({
  name: Joi.string().required(),
  logo: Joi.string().required(),
  featured_picture: Joi.string().required(),
  featured_product: Joi.string().required(),
  store_picture: Joi.string().required(),
  sections : Joi.array().required(),
  socials: Joi.required(),
  about: Joi.string().required(),
})

module.exports = {
  storeSchema
}