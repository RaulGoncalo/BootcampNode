import serviceServices from '../services/serviceServices.js';

const createService = async (req, res, next) => {
    try {
        const service = req.body;
        if (!service.descricao || !service.valor || !service.animalId) {
            throw new Error("Descrição, valor e animalId são obrigatórios");
        };

        res.send(await serviceServices.createService(service));
        logger.info(`POST /servico - ${JSON.stringify(service)}`)
    } catch (error) {
        next(error);
    }
};

const getServices = async (req, res, next) => {
    try {
        res.send(await serviceServices.getServices(req.query.proprietarioId));
        logger.info(`GET /servico`)
    } catch (error) {
        next(error);
    }
}

export default {
    createService,
    getServices
}