import { Router } from 'express';
import Product from '../../controllers/product';
import Validators from '../../validators';
import { authenticate, isBuyer } from '../../middleware';
import {
  product
} from '../../validators/schemas/product';

const route = Router();

route.post('/', authenticate, isBuyer, Validators(product), Product.postProduct);
route.get('/', Product.getAllProduct);
route.get('/:id', Product.getProduct);
route.delete('/:productId', Product.deleteProduct);


export default route;
