import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/', async (req, res, next) => {
    try {
        let account = req.body;

        if(!account.name || account.balance === null || account.balance === "" || account.balance === undefined){
            throw new Error("Nome e saldo são obrigatórios")
        };

        const data = JSON.parse(await readFile(global.fileName));

        if (data.accounts.length > 0) {
            try {
                let lastId = data.accounts[data.accounts.length - 1].id;

                account = { id: ++lastId, name: account.name, balance: account.balance };

                data.accounts.push(account);

                await writeFile(global.fileName, JSON.stringify(data, null, 2));
                res.status(200).send(account);

                logger.info(`${req.method} ${req.baseUrl} User: ${account.id} - criado`);
            } catch (erro) {
                next(erro);
            }

        } else {
            try {
                account = { id: 1, name: account.name, balance: account.balance };

                data.accounts.push(account);

                await writeFile(global.fileName, JSON.stringify(data, null, 2));

                res.status(200).send(account);


                logger.info(`${req.method} ${req.baseUrl} User: 1 - criado`);
            } catch (erro) {
                next(erro);
            }
        }
    } catch (erro) {
        next(erro);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);


        logger.info(`${req.method} ${req.baseUrl}`)
    } catch (erro) {
        next(erro);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        const accountSelected = data.accounts.find(item => item.id === parseInt(req.params.id));

        if (accountSelected) {
            res.send(accountSelected)

            logger.info(`${req.method} ${req.baseUrl} - User: ${req.params.id} - busca de informações`);
        } else {
            throw new Error("Registro não encontrado");
        }

    } catch (erro) {
        next(erro);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        let data = JSON.parse(await readFile(global.fileName));

        if (data.accounts.find(item => item.id === parseInt(req.params.id))) {
            data.accounts = data.accounts.filter(item => item.id !== parseInt(req.params.id));

            try {
                await writeFile(fileName, JSON.stringify(data, null, 2));

                res.status(200).send({ message: "Deletado com sucesso" });



                logger.info(`${req.method} ${req.baseUrl} - User: ${req.params.id} - deletado`);
            } catch (erro) {
                next(erro);
            }
        } else {
            throw new Error("Registro não encontrado");
        }

    } catch (erro) {
        next(erro);
    }
});

//atualizar os recursos de forma integrais
router.put("/", async (req, res, next) => {
    let account = req.body;

    try {
        let data = JSON.parse(await readFile(global.fileName));

        if(!account.name || account.balance === null || account.balance === "" || account.balance === undefined){
            throw new Error("Nome e saldo são obrigatórios")
        };

        if (data.accounts.find(item => item.id === account.id)) {
            data.accounts.map((item, index) => {
                if (item.id === account.id) {
                    data.accounts[index] = {
                        id: item.id,
                        name: account.name,
                        balance: account.balance
                    }
                }
            })

            try {
                await writeFile(fileName, JSON.stringify(data, null, 2));

                res.status(200).send({ message: "Atualizado com sucesso" });

                
                logger.info(`${req.method} ${req.baseUrl} - User: ${account.id} - informações atualizadas`);
            } catch (erro) {
                next(erro);
            }
        } else {
            throw new Error("Registro não encontrado");
        }
    } catch (erro) {
        next(erro);
    }
});

//atualiza os recursos de forma parciais 
router.patch("/upadateBalance", async (req, res, next) => {
    let account = req.body;

    try {
        let data = JSON.parse(await readFile(global.fileName));

        if(!account.id || account.balance === null || account.balance === "" || account.balance === undefined){
            throw new Error("ID e saldo são obrigatórios")
        };

        if (data.accounts.find(item => item.id === account.id)) {
            data.accounts.map((item, index) => {
                if (item.id === account.id) {
                    data.accounts[index] = {
                        id: item.id,
                        name: item.name,
                        balance: account.balance
                    }
                }
            })

            try {
                await writeFile(fileName, JSON.stringify(data, null, 2));

                res.status(200).send({ message: "Saldo atualizado com sucesso" });



                logger.info(`${req.method} ${req.baseUrl} - User: ${account.id} - saldo atualizado`);
            } catch (erro) {
                next(erro);
            }
        } else {
            throw new Error("Registro não encontrado");
        }
    } catch (erro) {
        next(erro);
    }
});


router.use((erro, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} ${erro.message}`);
    res.status(400).send({ error: erro.message });
});

export default router;