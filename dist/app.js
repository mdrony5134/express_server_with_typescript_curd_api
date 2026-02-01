import express from "express";
import fs from "fs";
const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Welcome to products API");
// });

// get all products
app.get("/products", (req, res) => {
  const { name, category } = req.query;
  const exisistingData = fs.readFileSync("./src/db/data.json", {
    encoding: "utf-8",
  });
  let parsedData = JSON.parse(exisistingData);
  if (name) {
    parsedData.products = parsedData.products.filter((product) =>
      product.name.toLowerCase().includes(String(name).toLowerCase()),
    );
  }
  if (category) {
    parsedData.products = parsedData.products.filter(
      (product) =>
        product.category.toLowerCase() === String(category).toLowerCase(),
    );
  }
  console.log(parsedData);

  res.json(parsedData);
});

// create a product
app.post("/products/create-product", (req, res) => {
  const exisistingData = fs.readFileSync("./src/db/data.json", {
    encoding: "utf-8",
  });
  const parsedData = JSON.parse(exisistingData);
  const { name, category, price, inStock } = req.body;

  const newProduct = {
    id: parsedData.products.length + 1,
    name,
    category,
    price,
    inStock,
  };

  parsedData.products.push(newProduct);
  fs.writeFileSync("./src/db/data.json", JSON.stringify(parsedData, null, 2), {
    encoding: "utf-8",
  });

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
});

// get a single product
app.get("/products/single-product/:id", (req, res) => {
  const { id } = req.params;
  const exisistingData = fs.readFileSync("./src/db/data.json", {
    encoding: "utf-8",
  });
  const parsedData = JSON.parse(exisistingData);

  const product = parsedData.products.find(
    (product) => product.id === parseInt(id),
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    product,
  });
});

// update a product
app.put("/products/update-product/:id", (req, res) => {
  const exisistingData = fs.readFileSync("./src/db/data.json", {
    encoding: "utf-8",
  });
  const parsedData = JSON.parse(exisistingData);
  const { id } = req.params;
  const { name, category, price, inStock } = req.body;

  const productIndex = parsedData.products.findIndex(
    (product) => product.id === parseInt(id),
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const updateProduct = {
    id: parseInt(id),
    name,
    category,
    price,
    inStock,
  };
  parsedData.products[productIndex] = updateProduct;
  fs.writeFileSync("./src/db/data.json", JSON.stringify(parsedData, null, 2), {
    encoding: "utf-8",
  });

  res.status(200).json({
    message: "Product updated successfully",
    product: updateProduct,
  });
});

// delete a product
app.delete("/products/delete-product/:id", (req, res) => {
  const { id } = req.params;
  const exisistingData = fs.readFileSync("./src/db/data.json", {
    encoding: "utf-8",
  });
  const parsedData = JSON.parse(exisistingData);

  const filteredProducts = parsedData.products.filter(
    (product) => product.id !== parseInt(id),
  );
  parsedData.products = filteredProducts;

  fs.writeFileSync("./src/db/data.json", JSON.stringify(parsedData, null, 2), {
    encoding: "utf-8",
  });

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

export default app;
//# sourceMappingURL=app.js.map
