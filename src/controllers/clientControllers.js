import clientServices from "../services/clientServices.js";

async function createClient(req, res, next) {
  try {
    const client = req.body;
    if (
      !client.name ||
      !client.email ||
      !client.password ||
      !client.phone ||
      !client.address
    ) {
      throw new Error(
        "Name, e-mail, password, phone and address are mandatory"
      );
    }
    res.status(201).send(await clientServices.createClient(client));

    logger.info(`POST /client - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function readAllClient(req, res, next) {
  try {
    res.send(await clientServices.readAllClient());

    logger.info(`GET /client - todos clientes`);
  } catch (error) {
    next(error);
  }
}

async function readClient(req, res, next) {
  try {
    const idClient = req.params.id;
    res.send(await clientServices.readClient(idClient));

    logger.info(`GET /client - ${idClient}`);
  } catch (error) {
    next(error);
  }
}

async function updateClient(req, res, next) {
  try {
    const client = req.body;
    if (
      !client.clientId ||
      !client.name ||
      !client.email ||
      !client.password ||
      !client.phone ||
      !client.address
    ) {
      throw new Error(
        "ClientId, name, e-mail, password, phone and address are mandatory"
      );
    }

    const email = req.auth.user;

    res.send(await clientServices.updateClient(email, client));

    logger.info(`PUT /client - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteClient(req, res, next) {
  try {
    const idClient = req.params.id;
    if (!idClient) {
      throw new Error("ClientId is mandatory");
    }
    res.send(await clientServices.deleteClient(idClient));

    logger.info(`DELETE /client - ${idClient}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createClient,
  readAllClient,
  readClient,
  updateClient,
  deleteClient,
};
