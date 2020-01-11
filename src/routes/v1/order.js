import { Router } from 'express';
import Order from '../../controllers/order';
import Validators from '../../validators';
import { authenticate } from '../../middleware';
import {
  order
} from '../../validators/schemas/order';

const route = Router();

route.post('/:productId', authenticate, Validators(order), Order.orderProduct);
route.get('/:orderId', authenticate, Order.singleOrder);
route.get('/', authenticate, Order.allOrders);
// route.delete('/:productId', Product.deleteProduct);


export default route;
