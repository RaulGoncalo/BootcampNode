import express from 'express';
import accountsRouter from './routes/accounts.js';
import {promises as fs} from 'fs' 

const {readFile, writeFile} = fs;

global.fileName = "accounts.json";


const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
//salvaremos as contas em um arquivo json. Então ele ira verificar se o arquivo existe senão ele cria um novo
    try {
        await readFile(global.fileName);
        console.log("API_EXECUTANDO");

    } catch (error) {
        const initialJson = {
            accounts: []
        };

        try {
            await writeFile(global.fileName, JSON.stringify(initialJson));
            console.log("API_EXECUTANDO: File criado");    
        } catch (error) {
            console.log(error)
        }
    }
});