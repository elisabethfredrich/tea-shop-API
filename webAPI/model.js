import * as fs from "fs/promises";
const DATA_FILE = "./webAPI/data.json";

// return all customers from file
export async function getAll() {
  try {
    let dataTxt = await fs.readFile(DATA_FILE);
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

  export async function getAllBaskets() {
    let data = await getAll();
    return data[3].baskets;
  }

//save all customers (after adding new one) to file
async function saveCustomers(newCustomers = []) {
    let data = await getAll();
    data[0].customers = newCustomers;
    let dataTxt = JSON.stringify(data);
    await fs.writeFile(DATA_FILE, dataTxt);
  }

  //save all baskets (after adding new one) to file
async function saveBasketForCustomers(newBaskets = []) {
  let data = await getAll();
  data[3].baskets = newBaskets;
  let dataTxt = JSON.stringify(data);
  await fs.writeFile(DATA_FILE, dataTxt);
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

  // Test function for if a specific user already are stored in the basket array 
// This doesn't work!!
function findCustomerBasket(basketArray, Id) {
  return basketArray.findIndex(
    (currBasket) => currBasket.customerId === Id
  );
}
 
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

  // Get basket by id for a specific customer 
  export async function getBasket(customerId) {
    let customerBasketArray = await getAllBaskets();
    let index = findCustomerBasket(customerBasketArray, customerId);
    if (index === -1)
      throw new Error(`Customer with ID:${productId} doesn't have a basket`);
    else return customerBasketArray[index];
  } 

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

    // create a new basket for a specific customer ID 
export async function addBasketForCustomer(basket) {
  let customerBasketArray = await getAllBaskets(); 
  if (findCustomerBasket(customerBasketArray, basket.customerId) !== -1 )
  throw new Error(`Customer with Id:${basket.customerId} already has a basket`);
    // Should the basket array only contain the customerID or store all details about the customer? 
      else customerBasketArray.push(basket);
      await saveBasketForCustomers(customerBasketArray);
  }


  // create a product into a specific customers basket 
  export async function createProductInBasketForCustomer (customerId, productId){
    let basketArray = await getAllBaskets();
    let index = findCustomerBasket(basketArray, customerId);
    if (index === -1)
    throw new Error(`Customer with Id:${customerId} doesn't exist`);
    else basketArray.push(productId);
    await saveBasketForCustomers(customerBasketArray);
  }


  // Delete a specific item in a specific customers basket 
  export async function deleteItemFromBasket(customerId, productId){
    let basketArray = await getAllBaskets();
    let index = findCustomerBasket(basketArray, customerId);
    if (index === -1)
    throw new Error(`Customer with Id:${customerId} doesn't exist`);
    else basketArray[index].remove();
    await saveBasketForCustomers(basketArray);

  }
    