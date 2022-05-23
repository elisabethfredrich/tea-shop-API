import * as productsModel from "./products.model.js";

//GET
export async function getAllProducts(req, res) {
    try {
        let allProducts = await productsModel.getAllProducts();
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
        let product = await productsModel.getProductByID(productId);
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
        let products = await productsModel.getProductsByCategory(category);
        res.json(products);
      } catch (error) {
        // res.statusMessage=
        res.status(400).send(error.message);
      }
    }