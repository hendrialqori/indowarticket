import "./config/aliases";
import "dotenv/config";
import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(errorMiddleware);

const server = app.listen(8080, "0.0.0.0", (error) => {
  if (error) throw error;
  console.log(`Server listening on ${JSON.stringify(server.address())}`);
});

export { app, server };
