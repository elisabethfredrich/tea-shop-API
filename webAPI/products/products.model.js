import * as fs from "fs/promises";
const DATA_FILE = "./webAPI/data.json";

// return all data from file
export async function getAll() {
  try {
    let dataTxt = await fs.readFile(DATA_FILE);
    let data = JSON.parse(dataTxt);
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

  export async function getAllProducts() {
    let data = await getAll();
    if (data[1].products.length === 0)
        throw new Error(`No products exist`);
    else return data[1].products;
  }



function findProduct(productArray, Id) {
    return productArray.findIndex(
      (currProduct) => currProduct.productId === Id
    );
  }

export async function getProductByID(productId) {
    let productArray = await getAllProducts();
    let index = findProduct(productArray, productId);
    if (index === -1)
      throw new Error(`Product with ID:${productId} doesn't exist`);
    else return productArray[index];
  }



function findProductsByCategory(productArray, category) {
    let products = productArray.filter(product => product.categories.includes(category));
    return products;
    }


  export async function getProductsByCategory(category) {
      let productArray = await getAllProducts();
      let productCategoryArray = findProductsByCategory(productArray, category);
      if(productCategoryArray.length === 0){
        throw new Error(`Product category ${category} does not exist`); 
      }
      else return  productCategoryArray;
    }
