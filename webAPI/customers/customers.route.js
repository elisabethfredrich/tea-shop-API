import express from 'express';
import {postCustomer, getCustomer} from './customers.controller.js';

export const customersRouter = express.Router();

// middleware specific to this route
customersRouter.use(express.json())


customersRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// route handlers
customersRouter.post("/customers", postCustomer);
customersRouter.get("/customers/:customerId", getCustomer);