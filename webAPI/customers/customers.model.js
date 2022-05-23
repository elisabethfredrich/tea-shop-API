import * as fs from "fs/promises";
import * as productsModel from "../products/products.model.js";
const DATA_FILE = "../data.json";


export async function getAllCustomers() {
    let data = await productsModel.getAll();
    return data[0].customers;
  }


  //save all customers (after adding new one) to file
async function saveCustomers(newCustomers = []) {
    let data = await getAll();
    data[0].customers = newCustomers;
    let dataTxt = JSON.stringify(data);
    await fs.writeFile(DATA_FILE, dataTxt);
  }

  // test functions 
function findCustomer(customerArray, Id) {
    return customerArray.findIndex(
      (currCustomer) => currCustomer.customerId === Id
    );
  }


  export async function getCustomerByID(customerId) {
    let customerArray = await getAllCustomers();
    let index = findCustomer(customerArray, customerId);
    if (index === -1)
      throw new Error(`Customer with ID:${customerId} doesn't exist`);
    else return customerArray[index];
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


