import express, { application } from 'express';
import fs from 'fs';
import path from 'path';
export const productsRouter = express.Router();
const pathName = path.join(process.cwd(), 'db', 'data.json');
// Create a new product
productsRouter.post('/create-product', (req, res) => {
    const { name, price, category, inStock } = req.body;
    console.log(req.body);
    const data = fs.readFileSync(pathName, "utf-8");
    const parsedData = JSON.parse(data);
    const newProduct = {
        id: parsedData.products.length + 1,
        name,
        price,
        category,
        inStock
    };
    parsedData.products.push(newProduct);
    fs.writeFileSync(pathName, JSON.stringify(parsedData, null, 2));
    res.json({ message: "Product created successfully", product: newProduct });
});
// get all products
productsRouter.get('/', (req, res) => {
    const data = fs.readFileSync(pathName, "utf-8");
    console.log("data", data);
    const parsedData = JSON.parse(data);
    res.json({ message: "Products retrieved successfully", products: parsedData.products });
});
// get single product
productsRouter.get('/single-product/:id', (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(pathName, "utf-8");
    const parsedData = JSON.parse(data);
    const product = parsedData.products.find((product) => product.id === parseInt(id));
    if (product) {
        res.json({ message: "Product retrieved successfully", product });
    }
    else {
        res.status(404).json({ message: "Product not found" });
    }
});
// delete a product
productsRouter.delete('/delete-product/:id', (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(pathName, "utf-8");
    const parsedData = JSON.parse(data);
    if (parsedData.products.length > 0) {
        const updatedProducts = parsedData.products.filter((product) => product.id !== parseInt(id));
        parsedData.products = updatedProducts;
        fs.writeFileSync(pathName, JSON.stringify(parsedData, null, 2));
        res.json({ message: "Product deleted successfully" });
    }
    else {
        res.status(404).json({ message: "Product not found" });
    }
});
// update a product
productsRouter.put('/update-product/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, category, inStock } = req.body;
    const data = fs.readFileSync(pathName, "utf-8");
    const parsedData = JSON.parse(data);
    const productIndex = parsedData.products.findIndex((product) => product.id === parseInt(id));
    if (productIndex !== -1) {
        parsedData.products[productIndex] = {
            id: parseInt(id),
            name,
            price,
            category,
            inStock
        };
        fs.writeFileSync(pathName, JSON.stringify(parsedData, null, 2));
        res.json({ message: "Product updated successfully", product: parsedData.products[productIndex] });
    }
    else {
        res.status(404).json({ message: "Product not found" });
    }
});
//# sourceMappingURL=products.route.js.map