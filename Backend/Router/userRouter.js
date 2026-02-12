import express from 'express';
import { getUsersList, userById } from '../Controller/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/allusers', verifyToken, getUsersList)
userRouter.get('/user/:id',verifyToken, userById)


export default userRouter;