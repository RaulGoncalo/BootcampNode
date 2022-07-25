import express from 'express';
import cors from 'cors';
import winston from 'winston';

import clientRoute from './routes/clientRoute.js';
import productRoute from './routes/productRoute.js';
import saleRoute from './routes/saleRoute.js';
import supplierRoute from './routes/supplierRoute.js';


const { combine, timestamp, label, printf } = winston.format;
const myFormt = printf(({ level, message, label, timestamp }) => {
    return `${timestamp}  [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "store - api.log" })
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

app.use("/client", clientRoute);
app.use("/product", productRoute);
app.use("/sale", saleRoute);
app.use("/supplier", supplierRoute);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});
app.listen(3000, () => {
    console.log("API_START");
})