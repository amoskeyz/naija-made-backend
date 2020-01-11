import { Router } from 'express';
import user from './user';
import product from './product';
import order from './order';

const route = Router();

route.use('/user', user);
route.use('/product', product);
route.use('/order', order);

export default route;
