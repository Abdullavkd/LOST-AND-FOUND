import express from 'express';
import { allPosts, deleteProduct, myPosts, postProduct, productDetails, updateProduct } from '../Controller/product.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/', verifyToken, postProduct);
productRouter.get('/', allPosts);
productRouter.get('/myposts', verifyToken, myPosts);
productRouter.get('/:id', productDetails);
productRouter.patch('/:id', verifyToken, updateProduct);
productRouter.delete('/:id', verifyToken, deleteProduct);

export default productRouter;