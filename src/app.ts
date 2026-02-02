import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { productsRouter } from "./app/products.route.js";
const app: Application = express();
app.use(express.json());


app.use("/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the products API" });
});

export default app;
