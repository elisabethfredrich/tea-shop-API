import * as customerModel from "./customers.model.js";


export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await customerModel.addCustomer(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function getCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = await customerModel.getCustomerByID(id);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

//products

export async function getAllProducts(req, res) {
  try {
      let allProducts = await customerModel.getAllProducts();
      res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

  export async function getProduct (req, res) {
    try {
      let id = parseInt(req.params.id)
      let product = await customerModel.getProductByID(id);
      res.json(product);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function getProductCategories (req, res) {
    try {
      let allCategories = await customerModel.getAllProductCategories();
      res.json(allCategories);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function getAllProductsByCategory (req, res) {
    try {
      let category = req.params.category;
      let products = await customerModel.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }



  

  
