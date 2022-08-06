import Animal from '../models/animalModels.js';
import Service from '../models/serviceModels.js';

const createService = async (service) => {
    try {
        return await Service.create(service);
    } catch (error) {
        throw error;
    }
};

const getServices = async () => {
    try {
        return await Service.findAll();
    } catch (error) {
        throw error;
    }
};

const getServiceByOwnerId = async (ownerId) => {
    try {
        return await Service.findAll({
            include: [
                {
                    model: Animal,
                    where: {
                        proprietarioId: ownerId
                    }
                }
            ]
        });
    } catch (error) {
        throw error;
    }
}

export default {
    createService,
    getServices,
    getServiceByOwnerId
}