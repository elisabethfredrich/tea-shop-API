import * as model from "./model.js";


// customer calls
//POST
export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await model.addCustomer(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  



  //GET
  export async function getCustomer (req, res) {
    try {
      let customerId = parseInt(req.params.customerId)
      let customer = await model.getCustomerByID(customerId);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  //Get customer by email 
  export async function getCustomerEmail (req, res) {
    try {
      let customerEmail = req.params.customerEmail
      let customer = await model.getCustomerByEmail(customerEmail);
      res.json(customer);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

//product calls
//GET
export async function getAllProducts(req, res) {
  try {
      let allProducts = await model.getAllProducts();
      res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
//GET
  export async function getProduct (req, res) {
    try {
      let productId = parseInt(req.params.productId)
      let product = await model.getProductByID(productId);
      res.json(product);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
//GET
  export async function getAllProductsByCategory (req, res) {
    try {
      let category = req.params.category;
      let products = await model.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  

  // product category calls
//GET
  export async function getProductCategories (req, res) {
    try {
      let allCategories = await model.getAllProductCategories();
      res.json(allCategories);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }


// basket calls


//POST
export async function postBasketForCustomer(req, res) {
  try {
    let newBasket = req.body;
    await model.addBasketForCustomer(newBasket);
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
    await model.createProductInBasketForCustomer(customerId, newProduct);
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
    let basket = await model.getBasketAllInfo(customerId);
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
    await model.deleteProductFromBasket(customerId, productId);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
} 

  

  
