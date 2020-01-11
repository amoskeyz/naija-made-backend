module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING
  }, {});
  Image.associate = (models) => {
    Image.belongsTo(models.Product, {
      // as: 'image',
      foreignKey: 'imageId',
      // sourceKey: 'imageId',
      cascade: true,
    });
    Image.belongsTo(models.User, {
      foreignKey: 'userId',
      cascade: true,
    });
  };
  return Image;
};
