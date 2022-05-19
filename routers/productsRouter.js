import express from 'express';


import { getProducts, getProduct, buy } from './../controllers/productsController.js';


const productsRouter = express.Router();


productsRouter.get("/products", getProducts);
productsRouter.get("/product/:productID", getProduct);
productsRouter.post("/buy", buy);


export default productsRouter;