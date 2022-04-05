// index.js
import express from 'express'
import {postCustomer, getCustomer, getAllProducts, getProduct, getProductCategories, getAllProductsByCategory} from './customers.controller.js'

export const customerRouter = express.Router();

// middleware specific to this route
customerRouter.use(express.json())

// route handlers
customerRouter.post("/customers", postCustomer);
customerRouter.get("/customers/:id", getCustomer);
customerRouter.get("/products/", getAllProducts);
customerRouter.get("/products/:id", getProduct);
customerRouter.get("/productCategories", getProductCategories); 
customerRouter.get("/products/categories/:category", getAllProductsByCategory);

