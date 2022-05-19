import express from "express";
import cors from "cors";

import {customersRouter} from "./webAPI/customers/customers.route.js";
import {productsRouter} from "./webAPI/products/products.route.js";
import {productCategoriesRouter} from "./webAPI/productCategories/productCategories.route.js";
import {basketsRouter} from "./webAPI/baskets/baskets.route.js";

const app = express();
const PORT = 9000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled by router
app.use(customersRouter)
app.use(productsRouter)
app.use(productCategoriesRouter)
app.use(basketsRouter)

app.use(cors());


app.get("/", (req, res) => res.send("Server 3: Hello World!"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
