import ownerServices from "../services/ownerServices.js";

const insertOwner = async (req, res, next) => {
    const owner = req.body;

    try {
        if (!owner.nome || !owner.telefone) {
            throw new Error("Nome e telefone são obrigatórios");
        };

        res.status(201).send(await ownerServices.insertOwner(owner));
        logger.info(`POST /proprietario - ${JSON.stringify(owner)}`);
    } catch (error) {
        next(error)
    }
};

const getOwners = async (req, res, next) => {
    try {
        res.send(await ownerServices.getOwners());
    } catch (error) {
        next(error)
    }
};

const getOwner = async (req, res, next) => {
    try {
        res.send(await ownerServices.getOwner(req.params.id))
    } catch (error) {
        next(error)
    }
};

const deleteOwner = async (req, res, next) => {
    try {
        await ownerServices.deleteOwner(req.params.id)
        res.end()
    } catch (error) {
        next(error)
    }
};

const updateOwner = async (req, res, next) => {
    let owner = req.body;
    try {

        if (!owner.proprietario_id || !owner.nome || !owner.telefone) {
            throw new Error("Proprietario_id, nome e telefone são obrigatórios");
        };

        owner = await ownerServices.updateOwner(owner)

        if (!owner) {
            res.status(404).send("Usuario não encontrado")
        }

        res.status(200).send(owner);

        logger.info(`PUT /proprietario - ${JSON.stringify(owner)}`);
    } catch (error) {
        next(error)
    }
};

export default {
    insertOwner,
    getOwners,
    getOwner,
    deleteOwner,
    updateOwner,
}