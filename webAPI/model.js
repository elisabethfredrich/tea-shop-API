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

async function getAllCustomerEmails(){
  let customers = await getAllCustomers();
  let emails = [];
  customers.forEach(customer => {
    emails.push(customer.customerEmail);
  })
  return emails;
}

async function getAllCustomerIds(){
  let customers = await getAllCustomers();
  let ids = [];
  customers.forEach(customer => {
    ids.push(customer.customerId);
  });
  return ids;
}

  export async function getAllProducts() {
    let data = await getAll();
    if (data[1].products.length === 0)
        throw new Error(`No products exist`);
    else return data[1].products;
  }

// get the different product categories (type, price range, organic)
  export async function getAllProductCategories() {
    let data = await getAll();
    if (data[2].productCategories.length === 0)
      throw new Error(`No product categories exist`);
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

function findCustomerByEmail(customerArray, email) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerEmail === email
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
  export async function getBasket(customerId) {   //should this be renamed to getBasketByCustomer?
    let customerBasketArray = await getAllBaskets();
    let index = findCustomerBasket(customerBasketArray, customerId);
    if (index === -1)
      throw new Error(`Customer with ID:${customerId} doesn't have a basket`);
    else return customerBasketArray[index].products;
  } 


//functions called inside controller functions
export async function addCustomer(newCustomer) {
    let customerArray = await getAllCustomers();
    if (findCustomer(customerArray, newCustomer.customerId) !== -1)
    throw new Error(
        `Customer with Id:${newCustomer.customerId} already exists`
        );
    if(findCustomerByEmail(customerArray, newCustomer.customerEmail) !== -1) 
    throw new Error(
      `Customer with email:${newCustomer.customerEmail} already exists`
      );
        customerArray.push(newCustomer);
        await saveCustomers(customerArray);
    }


  export async function getProductsByCategory(category) {
      let productArray = await getAllProducts();
      let productCategoryArray = findProductsByCategory(productArray, category);
      if(productCategoryArray.length === 0){
        throw new Error(`Product category ${category} does not exist`); 
      }
      else return  productCategoryArray;
    }

    // create a new basket for a specific customer ID 
export async function addBasketForCustomer(basket) {
  let customerBasketArray = await getAllBaskets(); 
  let customerIds = await getAllCustomerIds();
  if(!customerIds.includes(basket.customerId))
    throw new Error(`Customer with Id:${basket.customerId} does not exist`);
  if (findCustomerBasket(customerBasketArray, basket.customerId) !== -1 )
  throw new Error(`Customer with Id:${basket.customerId} already has a basket`);
      else customerBasketArray.push(basket);
      await saveBasketForCustomers(customerBasketArray);
  }

  // adds a product to a specific customer's basket 
  export async function createProductInBasketForCustomer (customerId, newProduct){
    let customerBasketArray = await getAllBaskets();
    let productArray;
    let index = findCustomerBasket(customerBasketArray, customerId);
    if (index === -1)
      throw new Error(`Customer with ID:${customerId} doesn't have a basket`);
    else {
      productArray = customerBasketArray[index].products;


    //check if product already exists
      let productIndex = findProduct(productArray, newProduct.productId);
    if(productIndex === -1){
    productArray.push({productId:newProduct.productId,amount:1});}
    else{
      customerBasketArray[index].products[productIndex].amount += 1; 
    }
    await saveBasketForCustomers(customerBasketArray);}
  }

 // Get customer by email if it exists
  export async function getCustomerByEmail(customerEmail) {
    let customerArray = await getAllCustomers();
    let index = findCustomerByEmail(customerArray, customerEmail);
    if (index === -1)
      throw new Error(`Customer with email:${customerEmail} doesn't exist`);
    else return customerArray[index];
  }
  
  

    // Get all product information of items in basket of specific customer
    export async function getBasketAllInfo(customerId) {
      let basket = await getBasket(customerId);
      for(let i = 0; i<basket.length; i++){
        let product = await getProductByID(basket[i].productId);
        let amount = basket[i].amount;
        basket[i] = {product, amount};}
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

    else if (basket[productIndex].amount > 1){
      customerBasketArray[basketIndex].products[productIndex].amount -= 1;

    }
    else {
    basket.splice(productIndex,1);}
    await saveBasketForCustomers(customerBasketArray);
    
  }

