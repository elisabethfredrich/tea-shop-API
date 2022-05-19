import * as productsModel from "../products/products.model.js"

// get the different product categories (type, price range, organic)
export async function getAllProductCategories() {
    let data = await productsModel.getAll();
    if (data[2].productCategories.length === 0)
      throw new Error(`No product categories exist`);
    return data[2].productCategories;
  }

