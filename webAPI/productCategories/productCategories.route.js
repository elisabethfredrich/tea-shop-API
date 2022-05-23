import express from 'express';
import {getProductCategories} from './productCategories.controller.js';

export const productCategoriesRouter = express.Router();

// middleware specific to this route
productCategoriesRouter.use(express.json())


productCategoriesRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// route handlers
productCategoriesRouter.get("/productCategories", getProductCategories); 

