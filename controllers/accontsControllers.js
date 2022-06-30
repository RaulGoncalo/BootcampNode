
import AccountServices from '../services/accountsServices.js'

async function creatAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.name || account.balance === null || account.balance === "" || account.balance === undefined) {
            throw new Error("Nome e saldo são obrigatórios")
        };

        account = await AccountServices.creatAccount(account);

        res.send(account);

        logger.info(`${req.method} ${req.baseUrl} User: ${account.id} - criado`);

    } catch (erro) {
        next(erro);
    }
};

async function getAccounts(req, res, next) {
    try {
        res.send(await AccountServices.getAccounts());

        logger.info(`${req.method} ${req.baseUrl}`)
    } catch (erro) {
        next(erro);
    }
};

async function getAccount(req, res, next) {
    try {
        res.send(await AccountServices.getAccount(req.params.id))

        logger.info(`${req.method} ${req.baseUrl} - User: ${req.params.id} - busca de informações`);

    } catch (erro) {
        next(erro);
    }
};

async function deleteAccount(req, res, next) {
    try {
        await AccountServices.deleteAccount(req.params.id);

        res.status(200).send({ message: "Deletado com sucesso" });

        logger.info(`${req.method} ${req.baseUrl} - User: ${req.params.id} - deletado`);
    } catch (erro) {
        next(erro);
    }
};


async function updateAccount(req, res, next) {
    let account = req.body;

    try {
        if (!account.name || account.balance === null || account.balance === "" || account.balance === undefined) {
            throw new Error("Nome e saldo são obrigatórios")
        };
        await AccountServices.updateAccount(account);
        res.status(200).send({ message: "Atualizado com sucesso" });

        logger.info(`${req.method} ${req.baseUrl} - User: ${account.id} - informações atualizadas`);
    } catch (erro) {
        next(erro);
    }
}

async function updateBalance(req, res, next) {
    let account = req.body;

    try {
        if (!account.id || account.balance === null || account.balance === "" || account.balance === undefined) {
            throw new Error("ID e saldo são obrigatórios")
        };

        res.send( await AccountServices.updateBalance(account));

        logger.info(`${req.method} ${req.baseUrl} - User: ${account.id} - saldo atualizado`);

    } catch (erro) {
        next(erro);
    }

}

export default {
    creatAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance,
};