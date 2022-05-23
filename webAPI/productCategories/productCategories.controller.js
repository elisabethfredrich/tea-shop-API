import * as productCategoriesModel from "./productCategories.model.js";

//GET
export async function getProductCategories (req, res) {
    try {
      let allCategories = await productCategoriesModel.getAllProductCategories();
      res.json(allCategories);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
