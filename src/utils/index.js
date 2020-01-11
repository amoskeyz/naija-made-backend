import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import db from '../db/models';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const getToken = (id, email) => jwt.sign({ id, email }, process.env.SECRET, {
  expiresIn: '5h',
});

export const verificationToken = (id, email) => jwt.sign({ id, email }, process.env.SECRET, {
  expiresIn: '24h',
});

export const uploadImage = (img, publicId) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload(
    img.tempFilePath,
    { public_id: publicId },
    (err, res) => (err ? reject(err) : resolve(res.url))
  );
});

export const deleteImage = publicId => new Promise((resolve, reject) => {
  cloudinary.uploader.destroy(
    publicId,
    (err, res) => (err ? reject(err) : resolve(res.url))
  );
});

export const isBlackListed = async (token) => {
  const blockedToken = await db.BlackListedTokens.findOne({
    where: { token },
  });
  return !!blockedToken;
};

export const decodeToken = token => jwt.verify(token, process.env.SECRET);

export const blackListThisToken = async (token) => {
  const decoded = decodeToken(token);
  await db.BlackListedTokens.create({
    token,
    expireAt: decoded.exp,
  });
};

export const randomString = () => crypto.randomBytes(11).toString('hex');

export const hashPassword = password => bcrypt.hash(password, 10);

export const decodeUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  try {
    const decodedToken = decodeToken(token);

    const { email } = decodedToken;

    const user = await db.User.findOne({
      where: { email },
    });

    req.user = user;
  } catch (error) {
    req.user = null;
  }
  next();
};

export const validateJoi = (validateObject, schemaData) => {
  let error;
  const err = schemaData.validate(validateObject, { abortEarly: false });
  if (err.error) {
    error = err.error.details;
    error = error.map(singleErrors => {
      let { message } = singleErrors;
      message = message.replace(/"/gi, '');
      if (message.includes('[A-Za-z]')) {
        message = `${singleErrors.path[0]} should be a string with at least 3 characters`;
      }
      return message;
    });
  }
  return error;
};

export const errorstatus = (res, statusCode, errorMessage) => res.status(statusCode).json({
  status: statusCode,
  error: errorMessage,
});
