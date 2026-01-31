import express from 'express';
import { userRegister } from './Controller/auth.js';

const appRouter = express.Router();

appRouter.post("/register", userRegister)

export default appRouter;