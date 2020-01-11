import bcrypt from 'bcryptjs';
import { randomString, getToken } from '../../utils';
// import { sendMail } from '../../utils/mail';
import verificationMail from '../../utils/mail/verificationMail';
// import { activationMessage, resetPasswordMessage } from '../../utils/mailer/mails';


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    social: DataTypes.BOOLEAN,
    passwordResetToken: DataTypes.STRING,
    // passwordResetExpire: DataTypes.DATE,
    emailVerificationToken: DataTypes.STRING,
    emailNotify: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    appNotify: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    activated: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: 'buyer',
      values: ['buyer', 'seller', 'admin']
    },
    // byadmin: DataTypes.BOOLEAN,
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = !user.social
          ? await bcrypt.hash(user.password, 10)
          : null;
        user.emailVerificationToken = !user.social ? randomString() : null;
      },
      afterCreate: async (user) => {
        if (!user.social) {
          await verificationMail(user, 'verify_email');
        }
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: 'userId',
      cascade: true,
    });
  };

  User.prototype.passwordsMatch = function match(password) {
    return bcrypt.compare(password, this.password);
  };
  User.prototype.response = function response(addToken = true) {
    const userData = {
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      username: this.username,
      bio: this.bio,
      image: this.image,
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      role: this.role
    };
    if (addToken) userData.token = getToken(this.id, this.email);
    return userData;
  };
  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  return User;
};
