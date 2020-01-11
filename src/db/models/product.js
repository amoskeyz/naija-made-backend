module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    price: DataTypes.STRING,
    originalPrice: DataTypes.STRING,
    model: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,

  }, {});
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
      cascade: true,
    });
  };
  return Product;
};
