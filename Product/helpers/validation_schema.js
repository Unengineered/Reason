const Joi = require('@hapi/joi')


const productSchema = Joi.object({
  store: Joi.string().required(),
  name: Joi.string().required(),
  thumbnail: Joi.required(),
  pictures: Joi.required(),
  sizes: Joi.array().required(),
  colors: Joi.array().required(),
  price : Joi.number().required(),
  details: Joi.string().required() , 
  properties: Joi.array().required(),
  quick_info: Joi.array().required(),
})

module.exports = {
  productSchema
}