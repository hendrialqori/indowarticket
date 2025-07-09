import "./config/aliases";
import "./config/passport";
import "dotenv/config";
import express from "express";
import cookierParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./docs/swagger.json";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";
import { CLIENT_URL, PORT } from "./constants/dotenv";

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(cookierParser());

app.use(passport.initialize());

app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true,
    }),
);
app.use(morgan("dev"));

app.use("/api", routes);

app.use(errorMiddleware);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const server = app.listen(Number(PORT), "0.0.0.0", (error) => {
    if (error) throw error;
    console.log(`Server listening on ${JSON.stringify(server.address())}`);
});

export { app, server };
