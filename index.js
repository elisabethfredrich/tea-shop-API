import express from "express";

import {router} from "./webAPI/route.js";
//import {productsRouter} from "./products/products.route.js";
const app = express();
const PORT = 3000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled by router
app.use(router)


app.get("/", (req, res) => res.send("Server 3: Hello World!"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
