import * as fs from "fs/promises";
import * as productsModel from "../products/products.model.js";
const DATA_FILE = "./webAPI/data.json";




  export async function getAllBaskets() {
    let data = await productsModel.getAll();
    return data[3].baskets;
  }

    //save all baskets (after adding new one) to file
  async function saveBasketForCustomers(newBaskets = []) {
    let data = await getAll();
    data[3].baskets = newBaskets;
    let dataTxt = JSON.stringify(data);
    await fs.writeFile(DATA_FILE, dataTxt);
  }

  function findCustomerBasket(basketArray, Id) {
    return basketArray.findIndex(
      (currBasket) => currBasket.customerId === Id
    );
  }


  async function getAllCustomerIds(){
    let customers = await getAllCustomers();
    let ids = [];
    customers.forEach(customer => {
      ids.push(customer.customerId);
    });
    return ids;
  }

   // Get basket by id for a specific customer 
   export async function getBasket(customerId) {   //should this be renamed to getBasketByCustomer?
    let customerBasketArray = await getAllBaskets();
    let index = findCustomerBasket(customerBasketArray, customerId);
    if (index === -1)
      throw new Error(`Customer with ID:${customerId} doesn't have a basket`);
    else return customerBasketArray[index].products;
  } 

      // create a new basket for a specific customer ID 
export async function addBasketForCustomer(basket) {
    let customerBasketArray = await getAllBaskets(); 
    let customerIds = await getAllCustomerIds();
    if(!customerIds.includes(basket.customerId))
      throw new Error(`Customer with Id:${basket.customerId} does not exist`);
    if (findCustomerBasket(customerBasketArray, basket.customerId) !== -1 )
    throw new Error(`Customer with Id:${basket.customerId} already has a basket`);
      // Should the basket array only contain the customerID or store all details about the customer? 
        else customerBasketArray.push(basket);
        await saveBasketForCustomers(customerBasketArray);
    }


  // adds a product to a specific customer's basket 
  export async function createProductInBasketForCustomer (customerId, newProduct){
    let customerBasketArray = await getAllBaskets();
    let productArray;
    let index = findCustomerBasket(customerBasketArray, customerId);
    await productsModel.getProductByID(newProduct.productId);
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
        let product = await productsModel.getProductByID(basket[i].productId);
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

    let productIndex = productsModel.findProduct(basket, productId);
    if (productIndex === -1)
    throw new Error(`Product with Id:${productId} is not in the customer's basket`);
    else basket.splice(productIndex,1);
    await saveBasketForCustomers(customerBasketArray);

  }