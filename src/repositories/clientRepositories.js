import Client from '../models/clientModels.js';

const insertClient = async (client) => {
    try {
        return await Client.create(client);
    } catch (error) {
        throw error
    }
};


const getClients = async () => {
    try {
        return await Client.findAll();
    } catch (error) {
        throw error
    }
};

const getClient = async (id) => {
    try {
        return await Client.findByPk(id);
    } catch (error) {
        throw error
    }
};

const deleteClient = async (id) => {
    try {
        await Client.destroy({
            where: {
                clientId: id
            }
        });
    } catch (error) {
        throw error
    }
};

const updateClient = async (client) => {
    try {
        await Client.update(client, {
            where: {
                clientId: client.clientId
            }
        });

        return await getClient(client.clientId)
    } catch (error) {
        throw error
    }
};


export default {
    insertClient,
    getClient,
    getClients,
    deleteClient,
    updateClient,
};