import Joi from '@hapi/joi';

export const order = Joi.object().keys({
  quantity: Joi.number()
    .required(),
});
