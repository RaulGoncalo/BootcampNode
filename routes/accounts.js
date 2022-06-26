import express from 'express';
import { appendFile, promises as fs } from 'fs';

global.fileName = "accounts.json";

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/', async (req, res, next) => {
    try {
        let account = req.body;

        const data = JSON.parse(await readFile(global.fileName));

        if (data.accounts.length > 0) {
            try {
                let lastId = data.accounts[data.accounts.length - 1].id;

                account = { id: ++lastId, ...account };

                data.accounts.push(account);

                await writeFile(global.fileName, JSON.stringify(data, null, 2));
                res.status(200).send(account);
            } catch (erro) {
                next(erro);
            }

        } else {
            try {
                account = { id: 1, ...account };

                data.accounts.push(account);

                await writeFile(global.fileName, JSON.stringify(data, null, 2));

                res.status(200).send(account);
            } catch (erro) {
                next(erro);
            }
        }
    } catch (erro) {
        next(erro);
    }
});

router.get("/", async (_, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data)
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
        } else {
            res.send("Não encontrado")
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

                res.status(200).send({ message: "Deletado com sucesso" })
            } catch (erro) {
                rnext(erro);
            }
        } else {
            res.send("Não encontrado")
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

                res.status(200).send({ message: "Atualizado com sucesso" })
            } catch (erro) {
                next(erro);
            }
        } else {
            res.send("Não encontrado")
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

                res.status(200).send({ message: "Saldo com sucesso"})
            } catch (erro) {
                next(erro);
            }
        } else {
            res.send("Não encontrado")
        }
    } catch (erro) {
        next(erro);
    }
});


router.use((erro, req, res, next) =>{
    console.log(erro)
    res.status(400).send({ error: erro.message })
});

export default router;