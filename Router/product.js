import express from 'express';
import { allPosts, postProduct, productDetails, updateProduct } from '../Controller/product.js';

const productRouter = express.Router();

productRouter.post('/', postProduct);
productRouter.get('/', allPosts);
productRouter.get('/:id', productDetails);
productRouter.patch('/:id', updateProduct);

export default productRouter;