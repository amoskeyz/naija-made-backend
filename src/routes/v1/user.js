import { Router } from 'express';
import User from '../../controllers/user';
import Validators from '../../validators';
import { authenticate } from '../../middleware';
import {
  signUp, login, updateUser, forgotPassword, changePassword
} from '../../validators/schemas/user';

const route = Router();

route.put('/', authenticate, Validators(updateUser), User.updateUser);
route.post('/signup', Validators(signUp), User.signUp);
route.post('/login', Validators(login), User.logIn);
route.post('/reset-password', Validators(forgotPassword), User.resetPassword);
route.put('/reset/:token', Validators(changePassword), User.changePassword);

export default route;
