import clientService from '../services/clientServices.js';

const creatClient = async (req, res, next) => {
    try {
        const client = req.body;

        if (!client.name || !client.cpf || !client.email || !client.phone || !client.address) {
            throw new Error("Nome, CPF, e-mail, telefone e endereço são obrigatórios")
        }

        res.status(201).send(await clientService.creatClient(client))

        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (error) {
        next(error)
    }
};

const getClients = async (req, res, next) => {
    try {
        res.send(await clientService.getClients());

        logger.info(`GET /client - todos clientes`);
    } catch (error) {
        next(error)
    }
};

const getClient = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }
        const client = await clientService.getClient(id)

        if (!client) {
            res.status(404).send("Usuario não encontrado")
        }

        res.send(client);

        logger.info(`GET /client - ${id}`);
    } catch (error) {
        next(error)
    }
};


const deleteClient = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }

        await clientService.deleteClient(id)
        res.status(204).end();

        logger.info(`DELETE /client - ${id}`);
    } catch (error) {
        next(error)
    }
};

const updateClient = async (req, res, next) => {
    try {
        let client = req.body;

        if (!client.clientId || !client.name || !client.cpf || !client.email || !client.phone || !client.address) {
            throw new Error("client_id, Nome, CPF, e-mail, telefone e endereço são obrigatórios");
        }

        client = await clientService.updateClient(client);

        if (!client) {
            res.status(404).send("Usuario não encontrado")
        }

        res.status(200).send(client);

        logger.info(`PUT /client - ${JSON.stringify(client)}`);

    } catch (error) {
        next(error)
    }
};

export default {
    creatClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
}