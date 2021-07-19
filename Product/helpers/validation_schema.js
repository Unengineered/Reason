const Joi = require('@hapi/joi')


const productSchema = Joi.object({
  store: Joi.string().required(),
  name: Joi.string().required(),
  pictures: Joi.array().required(),
  sizes: Joi.array().required(),
  colors: Joi.array().required(),
  price : Joi.number().required(),
  details: Joi.string().required() , 
  properties: Joi.required(),
  material: Joi.string().required(),
})

module.exports = {
  productSchema
}