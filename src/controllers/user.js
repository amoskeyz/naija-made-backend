import db from '../db/models';
import { uploadImage, decodeToken, hashPassword } from '../utils';
import verificationMail from '../utils/mail/verificationMail';

export default {
  signUp: async (req, res) => {
    const {
      firstName, lastName, email, password, username
    } = req.body;

    const newEmail = email.toLowerCase();
    const newUsername = username.toLowerCase();

    try {
      const user = await db.User.create({
        firstName,
        lastName,
        email: newEmail,
        password,
        username: newUsername
      });
      return res.status(201).json({
        message: 'User Registration successful',
        data: { ...user.response() }
      });
    } catch (e) {
      /* istanbul ignore next */
      return res.status(500).json({
        error: 'Something went wrong'
      });
    }
  },

  logIn: async (req, res) => {
    const { email, password } = req.body;
    const newEmail = email.toLowerCase();

    try {
      const user = await db.User.findOne({
        where: { email: newEmail }
      });

      if (!user) {
        return res.status(400).send({
          error: 'Invalid email or password'
        });
      }

      const isPasswordValid = await user.passwordsMatch(password);

      if (!isPasswordValid) {
        return res.status(400).send({
          error: 'Invalid email or password'
        });
      }

      return res.status(200).json({
        message: 'User Login in successful',
        data: { ...user.response() }
      });
    } catch (e) {
      /* istanbul ignore next */
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      let username = req.body.username || req.user.username;
      username = username.toLowerCase();
      const image = req.files
        ? await uploadImage(req.files.image, `${username}-profileImg`)
        : req.user.image;

      if (req.body.username) {
        const foundUser = await db.User.findOne({
          where: { username: req.body.username }
        });
        if (foundUser) {
          if (foundUser.id !== req.user.id) {
            return res.status(400).json({
              message: 'Username already exist'
            });
          }
        }
      }

      const user = await req.user.update(
        {
          username,
          firstName: req.body.firstName || req.user.firstName,
          lastName: req.body.lastName || req.user.lastName,
          image,
          bio: req.body.bio || req.user.bio
        }
      );

      res.status(200).json({
        message: 'User profile successfully updated',
        user: { ...user.response() }
      });
    } catch (e) {
      console.log(e);
      /* istanbul ignore next */
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await db.User.findOne({
        where: { email }
      });

      if (user) {
        const { token } = user.response();

        await user.update({ passwordResetToken: token });

        verificationMail(user, 'reset_password');

        return res.status(200).json({
          message: `Password Reset Link Sent Succeccfully to User: '${email}'`,
        });
      }
      return res.status(404).json({
        error: 'User Not Found'
      });
    } catch (e) {
      return res.status(500).json({
        error: 'something went wrong'
      });
    }
  },

  changePassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const decodedToken = decodeToken(token);

      if (!decodedToken) { return res.status(400).json({ error: 'Expired Link' }); }

      const passwordHash = await hashPassword(password);

      const user = await db.User.findOne({ where: { email: decodedToken.email } });

      if (user.passwordResetToken) {
        const userToken = decodeToken(user.passwordResetToken);

        if (userToken.id === decodedToken.id && userToken.email === decodedToken.email) {
          await user.update({
            password: passwordHash,
            passwordResetToken: null
          });
          return res.status(200).json({
            error: 'Password has successfully been changed.'
          });
        }
      }
      return res.status(400).json({
        error: 'Invalid Link'
      });
    } catch (e) {
    //   console.log(e);
      return res.status(400).json({
        error: 'Expired Link'
      });
    }
  }
};
