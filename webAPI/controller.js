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
      let id = parseInt(req.params.id)
      let customer = await model.getCustomerByID(id);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
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
      let id = parseInt(req.params.id)
      let product = await model.getProductByID(id);
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
    let id = parseInt(req.params.id)
    await customerModel.addBasketForCustomer(id);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

//POST
export async function postProductInBasketForCustomer(req, res) {
  try {
    let idCustomer = parseInt(req.params.id)
    let idProduct = parseInt(req.params.id)
    await customerModel.createProductInBasketForCustomer(idCustomer, idProduct);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

//GET
 export async function getBasketForCustomer (req, res) {
  try {
    let id = parseInt(req.params.id)
    let basket = await customerModel.getBasket(id);
    res.json(basket);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
} 

//DELETE
export async function deleteProductInBasketForCustomer (req, res) {
  try {
    let id = parseInt(req.params.id)
    let basket = await customerModel.deleteItemFromBasket(id);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
} 

export async function deleteProductInBasket (req,res){
  try {
    let idCustomer = parseInt(req.params.id)
    let idProduct = parseInt(req.params.id)
    let product = await customerModel.deleteItemFromBasket(idCustomer, idProduct);
    res.json(product);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
  

  
