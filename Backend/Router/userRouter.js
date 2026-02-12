import express from 'express';
import { getUsersList } from '../Controller/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/allusers', verifyToken, getUsersList)

export default userRouter;