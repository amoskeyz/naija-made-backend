import Joi from '@hapi/joi';

// const schema = {
export const signUp = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .required()
    .trim(),
  password: Joi.string()
    .required()
    .min(6),
  username: Joi.string().required(),
});

export const login = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .trim(),
  password: Joi.string()
    .required()
    .min(6),
});


export const updateUser = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim(),
  bio: Joi.string(),
  image: Joi.object(),
  username: Joi.string(),
});

export const forgotPassword = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .trim(),
});

export const changePassword = Joi.object().keys({
  password: Joi.string()
    .required()
    .min(6),
});
