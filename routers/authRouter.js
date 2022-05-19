import express from 'express';


import { signUp, login, validateToken } from './../controllers/authController.js';


const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);
authRouter.get("/login", validateToken);

export default authRouter;