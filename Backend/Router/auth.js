import express from 'express';
import { user, userDelete, userLogin, userLogout, userRegister, userUpdate } from '../Controller/auth.js';
import { refreshAccessToken, verifyToken } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.get('/user',verifyToken, user)
authRouter.get('/refresh', refreshAccessToken)
authRouter.post("/logout/:id", userLogout);
authRouter.patch("/update/:id",verifyToken, userUpdate);
authRouter.delete("/delete/:id",verifyToken, userDelete);

export default authRouter;