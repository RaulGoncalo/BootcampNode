import saleServices from "../services/saleServices.js";

async function createSale(req, res, next) {
  try {
    const sale = req.body;
    if (!sale.date || !sale.clientId || !sale.bookId) {
      throw new Error("Date, clientId and bookId are mandatory");
    }
    res.status(201).send(await saleServices.createSale(sale));

    logger.info(`POST /sale - ${JSON.stringify(sale)}`);
  } catch (error) {
    next(error);
  }
}

async function readAllSale(req, res, next) {
  try {
    const filterByClientId = req.query.clientId;
    const filterByBookId = req.query.bookId;
    const filetrByAuthorId = req.query.authorId;

    const email = req.auth.user;

    res.send(
      await saleServices.readAllSale(
        email,
        filterByClientId,
        filterByBookId,
        filetrByAuthorId
      )
    );

    logger.info(`GET /sale - todos salees`);
  } catch (error) {
    next(error);
  }
}

async function readSale(req, res, next) {
  try {
    const idSale = req.params.id;
    res.send(await saleServices.readSale(idSale));

    logger.info(`GET /sale - ${idSale}`);
  } catch (error) {
    next(error);
  }
}

async function updateSale(req, res, next) {
  try {
    const sale = req.body;
    if (
      !sale.saleId ||
      !sale.value ||
      !sale.date ||
      !sale.clientId ||
      !sale.bookId
    ) {
      throw new Error("SaleId, value, date, clientId and bookId are mandatory");
    }

    res.send(await saleServices.updateSale(sale));

    logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteSale(req, res, next) {
  try {
    const idSale = req.params.id;
    if (!idSale) {
      throw new Error("SaleId is mandatory");
    }
    res.send(await saleServices.deleteSale(idSale));

    logger.info(`DELETE /sale - ${idSale}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createSale,
  readAllSale,
  readSale,
  updateSale,
  deleteSale,
};
