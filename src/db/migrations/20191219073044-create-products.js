
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    originalPrice: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
    image1: {
      type: Sequelize.STRING
    },
    image2: {
      type: Sequelize.STRING
    },
    image3: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Products')
};
