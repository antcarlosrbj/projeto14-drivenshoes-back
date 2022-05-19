import { ObjectId } from "mongodb";
import db from "./db.js";
import jwt from 'jsonwebtoken';


export async function getProducts(req, res) {
    try {
        const products = await db.collection("products").find({}).toArray();
        res.send(products);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getProduct(req, res) {
    try {
        const { productID } = req.params;
        const product = await db.collection("products").find({ _id: ObjectId(productID) }).toArray();
        res.send(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function buy(req, res) {
    try {
        const request = req.body;

        /* VALIDAR TOKEN */

        const { authorization } = req.headers;

        if (!authorization) return res.sendStatus(401);
        const token = authorization.replace('Bearer ', '');
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) return res.sendStatus(401);

            /* VARIFICAR USUÁRIO */

            const user = await db.collection("users").findOne({ email: decoded.email });
            if (!user) return res.sendStatus(401);

            /* SALVAR PEDIDO */

            await db.collection("requests").insertOne({userID: user._id, ...request});
            res.sendStatus(201);
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}