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


// test functions 
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

function findCustomerBasket(basketArray, Id) {
  return basketArray.findIndex(
    (currBasket) => currBasket.customerId === Id
  );
}

function findProductsByCategory(productArray, category) {
  let products = productArray.filter(product => product.categories.includes(category));
  return products;
  }
 
// getter functions
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
      throw new Error(`Customer with ID:${customerId} doesn't have a basket`);
    else return customerBasketArray[index].products;
  } 


//functions called inside controller functions
export async function addCustomer(newCustomer) {
    let customerArray = await getAllCustomers();
    if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
        `Customer with Id:${newCustomer.customerId} already exists`
        );
        customerArray.push(newCustomer);
        await saveCustomers(customerArray);
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
  export async function createProductInBasketForCustomer (customerId, newProduct){
    let customerBasketArray = await getAllBaskets();
    let productArray;
    let index = findCustomerBasket(customerBasketArray, customerId);
    if (index === -1)
      throw new Error(`Customer with ID:${customerId} doesn't have a basket`);
    else productArray = customerBasketArray[index].products;
    productArray.push(newProduct);
    await saveBasketForCustomers(customerBasketArray);
  }

    // Get all product information of items in basket of specific customer
    export async function getBasketAllInfo(customerId) {
      let basket = await getBasket(customerId);
      for(let i = 0; i<basket.length; i++){
        let product = await getProductByID(basket[i].productId);
        basket[i] = product};
      return basket;
    } 


   // Delete a specific item in a specific customers basket 
   export async function deleteProductFromBasket(customerId, productId){
    let customerBasketArray = await getAllBaskets();
    let basket;
    let basketIndex = findCustomerBasket(customerBasketArray, customerId);
    if (basketIndex === -1)
      throw new Error(`Customer with ID:${customerId} doesn't have a basket`);
    else basket = customerBasketArray[basketIndex].products;

    let productIndex = findProduct(basket, productId);
    if (productIndex === -1)
    throw new Error(`Product with Id:${productId} is not in the customer's basket`);
    else basket.splice(productIndex,1);
    await saveBasketForCustomers(customerBasketArray);

  }
    