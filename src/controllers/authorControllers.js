import authorServices from "../services/authorServices.js";

async function createAuthor(req, res, next) {
  try {
    const author = req.body;
    if (!author.name || !author.email || !author.phone) {
      throw new Error("Name, e-mail, password and phone are mandatory");
    }
    res.status(201).send(await authorServices.createAuthor(author));

    logger.info(`POST /author - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function readAllAuthor(req, res, next) {
  try {
    res.send(await authorServices.readAllAuthor());

    logger.info(`GET /author - todos clientes`);
  } catch (error) {
    next(error);
  }
}

async function readAuthor(req, res, next) {
  try {
    const idAuthor = req.params.id;
    res.send(await authorServices.readAuthor(idAuthor));

    logger.info(`GET /author - ${idAuthor}`);
  } catch (error) {
    next(error);
  }
}

async function updateAuthor(req, res, next) {
  try {
    const author = req.body;
    if (!author.authorId || !author.name || !author.email || !author.phone) {
      throw new Error(
        "AuthorId, name, e-mail, password, phone and address are mandatory"
      );
    }

    res.send(await authorServices.updateAuthor(author));

    logger.info(`PUT /author - ${JSON.stringify(author)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    const idAuthor = req.params.id;
    if (!idAuthor) {
      throw new Error("AuthorId is mandatory");
    }
    res.send(await authorServices.deleteAuthor(idAuthor));

    logger.info(`DELETE /author - ${idAuthor}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createAuthor,
  readAllAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
};
