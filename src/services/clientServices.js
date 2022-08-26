import clientRepositories from "../repositories/clientRepositories.js";
import saleRepositories from "../repositories/saleRepositories.js";
import basicAuth from "express-basic-auth";

async function createClient(client) {
  return await clientRepositories.createClient(client);
}

async function readAllClient() {
  return await clientRepositories.readAllClient();
}

async function readClient(idClient) {
  return await clientRepositories.readClient(idClient);
}

async function updateClient(email, client) {
  const clientAuthenticated = await clientRepositories.readClientByEmail(email);

  if (clientAuthenticated.clientId !== client.clientId) {
    throw new Error("Unauthorized!");
  }

  return await clientRepositories.updateClient(client);
}

async function deleteClient(idClient) {
  const saleClient = await saleRepositories.readAllSalesByClientId(idClient);
  if (saleClient.length > 0) {
    throw new Error("Client has sales");
  }
  return await clientRepositories.deleteClient(idClient);
}

async function checksLogin(email, password) {
  const client = await clientRepositories.readClientByEmail(email);

  if (!client) {
    return false;
  }

  return basicAuth.safeCompare(password, client.password);
}

export default {
  createClient,
  readAllClient,
  readClient,
  updateClient,
  deleteClient,
  checksLogin,
};
