import * as basketsModel from "./baskets.model.js";


//POST
export async function postBasketForCustomer(req, res) {
    try {
      let newBasket = req.body;
      await basketsModel.addBasketForCustomer(newBasket);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  
  
  //POST
  export async function postProductInBasketForCustomer(req, res) {
    try {
      let customerId = parseInt(req.params.customerId)
      let newProduct = req.body;
      await basketsModel.createProductInBasketForCustomer(customerId, newProduct);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  
  //GET
   export async function getBasketForCustomer (req, res) {
    try {
      let customerId = parseInt(req.params.customerId)
      let basket = await basketsModel.getBasketAllInfo(customerId);
      res.json(basket);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  } 
  
  //DELETE
  export async function deleteProductInBasketForCustomer (req, res) {
    try {
      let customerId = parseInt(req.params.customerId)
      let productId = parseInt(req.params.productId)
      await basketsModel.deleteProductFromBasket(customerId, productId);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  } 