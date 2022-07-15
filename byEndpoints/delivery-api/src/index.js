import express  from "express";
import winston from 'winston';
import OrdersRoutes from './routes/ordersRoutes.js';


//configurando o tratamento de erros e gravação de logs
const {combine, label, printf, timestamp} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) =>{
    return `${timestamp} [${label}] - ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console),
        new (winston.transports.File)({
            filename: "delivery-api.log"
        })
    ],
    format: combine(
        label({label: "delivery-api"}),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json())
app.use("/orders", OrdersRoutes)
app.listen(3000,()=>{
    console.log("DELIVERY-API EXECUTED")
})