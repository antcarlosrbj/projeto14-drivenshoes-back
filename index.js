import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import authRouter from './routers/authRouter.js';
import productsRouter from './routers/productsRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(productsRouter);

const port = process.env.PORT || 5000;
app.listen(port);