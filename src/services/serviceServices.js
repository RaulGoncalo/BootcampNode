import serviceRepositories from '../repositories/serviceRepositories.js';

const createService = async (service) => {
    return await serviceRepositories.createService(service)
};

const getServices = async (ownerId) => {
    if (ownerId) {
        return await serviceRepositories.getServiceByOwnerId(ownerId)
    }
    return await serviceRepositories.getServices();
}

export default {
    createService,
    getServices
}