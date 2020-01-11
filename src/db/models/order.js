// import orderMail from '../../utils/mail/orderMail';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    buyerId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  }, {
    // hooks: {
    //   afterCreate: async (req, order) => {
    //     await orderMail(req, order, 'order_product');
    //   },
    // },
  });
  // Order.associate = function(models) {
    // associations can be defined here
  // };
  return Order;
};
