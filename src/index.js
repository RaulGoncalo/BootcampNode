import express from 'express';
import cors from 'cors';
import winston from 'winston';

import ownerRoutes from "./routes/ownerRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormt = printf(({ level, message, label, timestamp }) => {
    return `${timestamp}  [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "petShop - api.log" })
    ],
    format: combine(
        label({ label: "store-ai" }),
        timestamp(),
        myFormt
    )
});


const app = express();

app.use(express.json());
app.use(cors());

app.use("/proprietarios", ownerRoutes);
app.use("/animal", animalRoutes);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});
app.listen(3000, () => {
    console.log("API_START");
})