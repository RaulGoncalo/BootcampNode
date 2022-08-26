import express from "express";
import cors from "cors";
import winston from "winston";
import basicAuth from "express-basic-auth";

import clienteRouters from "./routes/clientRoutes.js";
import bookRouters from "./routes/bookRoutes.js";
import saleRouters from "./routes/saleRoutes.js";
import authRouters from "./routes/authorRoutes.js";
import { authorize, authorizer } from "./controllers/authControllers.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormt = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}  [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bookstore - api.log" }),
  ],
  format: combine(label({ label: "bookstore-api" }), timestamp(), myFormt),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  basicAuth({
    authorizeAsync: true,
    authorizer,
  })
);
app.use("/autor", authorize("admin"), authRouters);
app.use("/cliente", clienteRouters);
app.use("/livro", bookRouters);
app.use("/venda", saleRouters);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default app;
