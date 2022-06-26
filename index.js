import express from 'express';
import accountsRouter from './routes/accounts.js';
import {promises as fs} from 'fs' 
import winston from 'winston';


const {readFile, writeFile} = fs;

const { combine, label, printf, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-bank-api.log" })
    ],
    format: combine(
        label({ label: "my-bank-api" }),
        timestamp(),
        myFormat
    )
});


global.fileName = "accounts.json";


const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
//salvaremos as contas em um arquivo json. Então ele ira verificar se o arquivo existe senão ele cria um novo
    try {
        await readFile(global.fileName);
        logger.info("API_EXECUTANDO");

    } catch (error) {
        const initialJson = {
            accounts: []
        };

        try {
            await writeFile(global.fileName, JSON.stringify(initialJson));
            logger.info("API_EXECUTANDO: File criado");    
        } catch (error) {
            logger.error(error)
        }
    }
});