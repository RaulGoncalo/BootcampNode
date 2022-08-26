import Client from "../models/clientModel.js";

async function createClient(client) {
  try {
    const clientCreated = await Client.create(client);
    return clientCreated;
  } catch (error) {
    throw error;
  }
}

async function readAllClient() {
  try {
    const allClientFinded = await Client.findAll({
      attributes: ["clientId", "name", "email", "phone", "address"],
    });
    return allClientFinded;
  } catch (error) {
    throw error;
  }
}

async function readClient(idClient) {
  try {
    const clientFinded = await Client.findByPk(idClient, {
      attributes: ["clientId", "name", "email", "phone", "address"],
    });
    return clientFinded;
  } catch (error) {
    throw error;
  }
}

async function updateClient(client) {
  try {
    await Client.update(client, {
      where: {
        clientId: client.clientId,
      },
    });
    return await readClient(client.clientId);
  } catch (error) {
    throw error;
  }
}

async function deleteClient(idClient) {
  try {
    await Client.destroy({
      where: {
        clientId: idClient,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function readClientByEmail(email) {
  try {
    const clientFinded = await Client.findOne({
      where: {
        email: email,
      },
    });
    return clientFinded;
  } catch (error) {
    throw error;
  }
}

export default {
  createClient,
  readAllClient,
  readClient,
  updateClient,
  deleteClient,
  readClientByEmail,
};
