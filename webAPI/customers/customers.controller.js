import * as customersModel from "./customers.model.js";


//POST
export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await customersModel.addCustomer(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  
//GET
  export async function getCustomer (req, res) {
    try {
      let customerId = parseInt(req.params.customerId)
      let customer = await customersModel.getCustomerByID(customerId);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }