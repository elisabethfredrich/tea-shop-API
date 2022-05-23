import express from 'express';
import {getAllProducts, getProduct, getAllProductsByCategory} from './products.controller.js';

export const productsRouter = express.Router();

// middleware specific to this route
productsRouter.use(express.json())


productsRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// route handlers

productsRouter.get("/products/", getAllProducts);
productsRouter.get("/products/:productId", getProduct);
productsRouter.get("/products/:category", getAllProductsByCategory);


