import express from 'express';
import { userDelete, userLogin, userRegister, userUpdate } from '../Controller/auth.js';

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.patch("/update/:id", userUpdate);
authRouter.delete("/delete/:id", userDelete);

export default authRouter;