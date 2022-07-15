import express from 'express';
import accountsRouter from './routes/accountsRouters.js';
import { promises as fs } from 'fs'
import winston from 'winston';
import Schema from './schema/index.js';
import basicAuth from 'express-basic-auth';

//buildSchema serve para montar o "schema", ou seja modelar as entidades definindo os tipos;
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';


const { readFile, writeFile } = fs;

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

/*
const schema = buildSchema(`
    type Account {
        id: Int
        name: String
        balance: Float
    }

    input AccountInput {
        id: Int
        name: String
        balance: Float
    }

    type Query {
        getAccounts: [Account]
        getAccount(id: Int): Account 
    }

    type Mutation{
        createAccount(account: AccountInput): Account
        deleteAccount(id: Int): Boolean 
        updateAccount( account: AccountInput) : Account 
    }
`);


const root = {
    getAccounts: () => AccountsService.getAccounts(),
    getAccount(args) {
        return AccountsService.getAccount(args.id)
    },
    createAccount({account}){
        return AccountsService.creatAccount(account)
    },
    deleteAccount(args){
        return AccountsService.deleteAccount(args.id)
    },
    updateAccount({account}){
        return AccountsService.updateAccount(account)
    },
}
*/


const app = express();
app.use(express.json());



const getRole = (username) =>{
    if(username == 'admin'){
        return 'admin'
    }else if(username == 'raul'){
        return 'role1'
    }
}

const authorize = (...allwoed) =>{


    const isAllwoed = role => allwoed.indexOf(role) > -1;

    return (req, res, next) =>{
        if(req.auth.user){
            const role = getRole(req.auth.user);

            if(isAllwoed(role)){
                next()
            }else{
                res.status(401).send('Role not allwoed')
            }
        }else{
            res.status(403).send("User not found");
        }
    }
}

app.use(basicAuth({
    authorizer: (username, password) => {
        const userMatches = basicAuth.safeCompare(username, 'admin');
        const passwordMatches = basicAuth.safeCompare(password, 'admin');
        
        const user2Matches = basicAuth.safeCompare(username, 'angelo');
        const password2Matches = basicAuth.safeCompare(password, '1234');

        return userMatches && passwordMatches || user2Matches && password2Matches;
    }
}))

app.use("/account", authorize('admin', 'role1') ,accountsRouter);

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    //rootValue: root,
    graphiql: true
}))


app.listen(3000, async () => {
    //salvaremos as contas em um arquivo json. Então ele ira verificar se o arquivo existe senão ele cria um novo
    try {
        await readFile(global.fileName);
        logger.info("API_EXECUTANDO");

    } catch (error) {
        const initialJson = {
            nextId: 1,
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