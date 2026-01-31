import express from 'express';
import { userDelete, userLogin, userRegister, userUpdate } from '../Controller/auth.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.patch("/update/:id",verifyToken, userUpdate);
authRouter.delete("/delete/:id",verifyToken, userDelete);

export default authRouter;