/* eslint-disable max-len */
import db from '../../db/models';
import { uploadImage, deleteImage } from '../../utils';

export default {
  postProduct: async (req, res) => {
    try {
      const {
        title, brand, model, description, sellingPrice, originalPrice,
      } = req.body;

      const { username, id } = req.user;
      let image1 = null;
      let image2 = null;
      let image3 = null;
      let image = null;

      const newSellingPrice = sellingPrice.trim();
      const newOriginalPrice = originalPrice.trim();

      const product = await db.Product.create({
        title,
        brand,
        model,
        image,
        description,
        price: newSellingPrice,
        originalPrice: newOriginalPrice,
        userId: id,
        image1,
        image2,
        image3,
      });

      image = await uploadImage(req.files.image, `${username}-product${product.id}`);
      image1 = req.files.image1 ? await uploadImage(req.files.image1, `${username}-product${product.id}`) : image1 = null;
      image2 = req.files.image2 ? await uploadImage(req.files.image2, `${username}-product${product.id}`) : image2 = null;
      image3 = req.files.image3 ? await uploadImage(req.files.image3, `${username}-product${product.id}`) : image3 = null;

      await product.update({
        image, image1, image2, image3
      });
      return res.status(201).json({
        product
      });
    } catch (e) {
      return res.status(500).json({
        e
      });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      return res.status(200).json({
        products
      });
    } catch (e) {
      return res.status(500).json({
        e
      });
    }
  },

  getProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await db.Product.findOne({ where: { id: Number(id) } });
      if (!product) {
        return res.status(200).json({
          error: 'Item Not Found'
        });
      }
      return res.status(200).json({
        product
      });
    } catch (e) {
      return res.status(500).json({
        e
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    // const { role, id } = req.user;
    try {
      const product = await db.Product.findOne({
        where: { id: Number(productId) }
      });

      const { dataValues: { username } } = await db.User.findOne({
        where: { id: product.dataValues.userId }
      });

      console.log(product.dataValues, username);
      if (!product) {
        return res.status(400).json({
          error: 'Item Not Found'
        });
      }
      if (username) {
        await db.Product.destroy({ where: { id: Number(productId) } });
        await deleteImage(`${username}-product${product.dataValues.id}`);
        return res.status(200).json({
          message: 'Delete Successful'
        });
      }
      return res.status(400).json({
        error: 'You are not authorized to delete this item'
      });
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        error: 'Something Went Wrong'
      });
    }
  },

  // markSold: (req, res) => {

  // }
};
