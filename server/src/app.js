import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import status from 'http-status'

import routesV1 from './routes/v1/index.js';
import handleError from "./handlers/error.handler.js";

// create express application
const app = express();

// parse incoming request and append data to `req.body`
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// parse request cookies
app.use(cookieParser());

// compress response bodies
app.use(compression());

// adding set of security headers
app.use(helmet());

// enable all CORS request
app.use(cors());

// request logger
app.use(logger("dev"));

app.use("/api/v1", routesV1);

app.use("/", (req, res) => {
  res.send("App running");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.send(status.NOT_FOUND);
});

// error handler
app.use(handleError);

export default app;
