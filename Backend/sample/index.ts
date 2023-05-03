import express, { Request, Response, Express } from "express";
import Grouter from "./Oauth/googleOauth";
import connection from "./config/db";

const app: Express = express();
app.get("/", (req: Request, res: Response): void => {
  res.send("hello");
});
app.use("/", Grouter);
app.listen(4500, async (): Promise<void> => {
  try {
    await connection;
    console.log("connected to db");
    console.log("server is running on port 4500");
  } catch (error) {
    console.log(error);
  }
});
