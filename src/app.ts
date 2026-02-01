import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello girls sfs!!!");
});

app.get("/todos", (req: Request, res: Response) => {
  res.send("Hello bangladesh!");
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
