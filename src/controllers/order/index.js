// import { Op } from 'sequelize';
import db from '../../db/models';
import orderMail from '../../utils/mail/orderMail';

export default {
  orderProduct: async (req, res) => {
    try {
      const { quantity } = req.body;
      const { productId } = req.params;
      const { id } = req.user;

      const product = await db.Product.findOne({
        where: { id: Number(productId) }
      });

      if (!product) {
        return res.status(400).json({
          error: 'product not found'
        });
      }

      const price = (Number(product.dataValues.price) * Number(quantity)).toString();
      const status = 'pending';
      const order = await db.Order.create({
        buyerId: id,
        productId,
        status,
        quantity,
        price
      });
      console.log(await orderMail(req, order, 'order_mail'));

      return res.status(201).json({
        data: order
      });
    } catch (e) {
      console.log(e)
      return res.status(200).json({
        error: 'Something Went Wrong',
        // e
      });
    }
  },

  allOrders: async (req, res) => {
    try {
      let orders;
      if (req.user.role === 'admin') {
        orders = await db.Order.findAll();
        return res.status(201).json({
          data: orders
        });
      }
      orders = await db.Order.findAll({
        where: { buyerId: req.user.id }
      });
      return res.status(201).json({
        data: orders
      });
    } catch (e) {
      console.log(e)
      return res.status(200).json({
        error: 'Something Went Wrong'
      });
    }
  },

  singleOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await db.Order.findOne({ where: { id: Number(orderId) } });
      if (req.user.id !== (order.buyerId || order.userId)) {
        return res.status(200).json({
          error: 'You are not allowed to view this order'
        });
      }
      if (!order) {
        return res.status(200).json({
          error: 'Order Not Found'
        });
      }
      return res.status(200).json({
        data: order
      });
    } catch (e) {
      console.log(e)
      return res.status(200).json({
        error: 'Something Went Wrong'
      });
    }
  }
};
