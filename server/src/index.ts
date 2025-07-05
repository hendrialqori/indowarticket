import "./config/aliases";
import "./config/passport";
import "dotenv/config";
import express from "express";
import cookierParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";
import { CLIENT_URL, PORT } from "./constants/dotenv";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookierParser());

app.use(passport.initialize());

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api", routes);

app.use(errorMiddleware);

const server = app.listen(Number(PORT), "0.0.0.0", (error) => {
  if (error) throw error;
  console.log(`Server listening on ${JSON.stringify(server.address())}`);
});

export { app, server };
