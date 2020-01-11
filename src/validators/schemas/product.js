import Joi from '@hapi/joi';

export const product = Joi.object().keys({
  title: Joi.string()
    .required(),
  brand: Joi.string()
    .required(),
  model: Joi.string(),
  sellingPrice: Joi.string()
    .required(),
  originalPrice: Joi.string()
    .required(),
  description: Joi.string()
    .required()
    .min(50),
  image: Joi.object()
    .required(),
  image1: Joi.object(),
  image2: Joi.object(),
  image3: Joi.object(),
});
