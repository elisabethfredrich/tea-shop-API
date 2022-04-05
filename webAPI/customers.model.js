import * as fs from "fs/promises";
const CUSTOMERS_FILE = "./webAPI/data.json";

// return all customer from file
export async function getAll() {
  try {
    let dataTxt = await fs.readFile(CUSTOMERS_FILE);
    let data = JSON.parse(dataTxt);
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

export async function getAllCustomers() {
    let data = await getAll();
    return data[0].customers;
  }

  export async function getAllProducts() {
    let data = await getAll();
    return data[1].products;
  }

// get the different product categories (type, price range, organic)
  export async function getAllProductCategories() {
    let data = await getAll();
    return data[2].productCategories;
  }


async function saveCustomers(newCustomers = []) {
    let data = await getAll();
    data[0].customers = newCustomers;
    let dataTxt = JSON.stringify(data);
    await fs.writeFile(CUSTOMERS_FILE, dataTxt);
  }


// test function for customer ID
function findCustomer(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

function findProduct(productArray, Id) {
    return productArray.findIndex(
      (currProduct) => currProduct.productId === Id
    );
  }
 
// get customer by ID
export async function getCustomerByID(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

export async function getProductByID(productId) {
    let productArray = await getAllProducts();
    let index = findProduct(productArray, productId);
    if (index === -1)
      throw new Error(`Product with ID:${productId} doesn't exist`);
    else return productArray[index];
  }


// create a new customer
export async function addCustomer(newCustomer) {
    let customerArray = await getAllCustomers();
    if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
        `Customer with Id:${newCustomer.customerId} already exists`
        );
        customerArray.push(newCustomer);
        await saveCustomers(customerArray);
    }

function findProductsByCategory(productArray, category) {
  let products = productArray.filter(product => product.categories.includes(category));
  return products;
  }

    export async function getProductsByCategory(category) {
      let productArray = await getAllProducts();
      let productCategoryArray = findProductsByCategory(productArray, category);
      if(productCategoryArray.length === 0){
        throw new Error(`No products exist in category ${category}`); 
      }
      else return  productCategoryArray;
    }

    
    