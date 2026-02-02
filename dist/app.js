import express, {} from "express";
import { productsRouter } from "./app/products.route.js";
const app = express();
app.use(express.json());
app.use("/products", productsRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the products API" });
});
export default app;
//# sourceMappingURL=app.js.map