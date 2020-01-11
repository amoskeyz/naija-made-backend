module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    emailVerificationToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    activated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bio: {
      allowNull: true,
      type: Sequelize.STRING
    },
    image: {
      allowNull: true,
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    username: {
      unique: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    passwordResetToken: {
      type: Sequelize.STRING,
      allowNull: true
    },
    social: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    emailNotify: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    appNotify: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['seller', 'buyer', 'admin'],
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    }
  }),
  down: queryInterface => queryInterface.dropTable('Users')
};
