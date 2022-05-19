import express from 'express'
import {postBasketForCustomer, postProductInBasketForCustomer, getBasketForCustomer, deleteProductInBasketForCustomer} from './baskets.controller.js'

export const basketsRouter = express.Router();

// middleware specific to this route
basketsRouter.use(express.json())

basketsRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  // route handlers
  basketsRouter.post("/baskets", postBasketForCustomer);
  basketsRouter.post("/baskets/:customerId/products", postProductInBasketForCustomer);
  basketsRouter.delete("/baskets/:customerId/products/:productId", deleteProductInBasketForCustomer);
  basketsRouter.get("/baskets/:customerId/products", getBasketForCustomer)
  