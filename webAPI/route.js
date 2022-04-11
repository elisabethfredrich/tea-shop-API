// index.js
import express from 'express'
import {postCustomer, getCustomer, getAllProducts, getProduct, getProductCategories, getAllProductsByCategory, postBasketForCustomer, postProductInBasketForCustomer, getBasketForCustomer, deleteProductInBasketForCustomer} from './controller.js'

export const router = express.Router();

// middleware specific to this route
router.use(express.json())

// route handlers
router.post("/customers", postCustomer);
router.get("/customers/:id", getCustomer);
router.get("/products/", getAllProducts);
router.get("/products/:id", getProduct);
router.get("/productCategories", getProductCategories); 
router.get("/products/productCategories/:category", getAllProductsByCategory);

router.post("/baskets", postBasketForCustomer);
router.post("/baskets/:customerId/products", postProductInBasketForCustomer);
router.delete("/baskets/:customerId/products/:productId", deleteProductInBasketForCustomer);
router.get("/baskets/:customerId", getBasketForCustomer)

