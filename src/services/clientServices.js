import clientRepositories from "../repositories/clientRepositories.js";

const creatClient = async (client) => {
    return await clientRepositories.insertClient(client);
};

const getClients = async () => {
    return await clientRepositories.getClients();
};

const getClient = async (id) => {
    return await clientRepositories.getClient(id);
};

const deleteClient = async (id) => {
    await clientRepositories.deleteClient(id);
}

const updateClient = async (client) => {
    return await clientRepositories.updateClient(client);
};

export default {
    creatClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
};