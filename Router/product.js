import express from 'express';
import { allPosts, deleteProduct, postProduct, productDetails, updateProduct } from '../Controller/product.js';

const productRouter = express.Router();

productRouter.post('/', postProduct);
productRouter.get('/', allPosts);
productRouter.get('/:id', productDetails);
productRouter.patch('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;