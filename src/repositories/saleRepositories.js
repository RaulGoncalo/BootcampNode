import Sale from "../models/saleModel.js";
import Client from "../models/clientModel.js";
import Book from "../models/bookModel.js";

async function createSale(sale) {
  try {
    const saleCreated = await Sale.create(sale);
    return saleCreated;
  } catch (error) {
    throw error;
  }
}

async function readAllSale() {
  try {
    const allSaleFinded = await Sale.findAll({
      include: [
        {
          model: Client,
        },
        {
          model: Book,
        },
      ],
    });
    return allSaleFinded;
  } catch (error) {
    throw error;
  }
}

async function readSale(idSale) {
  try {
    const saleFinded = await Sale.findByPk(idSale);
    return saleFinded;
  } catch (error) {
    throw error;
  }
}

async function updateSale(sale) {
  try {
    await Sale.update(sale, {
      where: {
        saleId: sale.saleId,
      },
    });
    return await readSale(sale.saleId);
  } catch (error) {
    throw error;
  }
}

async function deleteSale(idSale) {
  try {
    await Sale.destroy({
      where: {
        saleId: idSale,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function readAllSalesByClientId(idClient) {
  try {
    const salesFinded = await Sale.findAll({
      where: {
        clientId: idClient,
      },
      include: [{ model: Client }, { model: Book }],
    });

    return salesFinded;
  } catch (error) {
    throw error;
  }
}

async function readAllSalesByBookId(idBook) {
  try {
    const salesFinded = await Sale.findAll({
      where: {
        bookId: idBook,
      },
      include: [{ model: Client }, { model: Book }],
    });

    return salesFinded;
  } catch (error) {
    throw error;
  }
}

async function readAllSalesByAuthorId(idAuthor) {
  try {
    const salesFindByAuthorId = await Sale.findAll({
      include: [
        {
          model: Book,
          where: {
            authorId: idAuthor,
          },
        },
      ],
    });

    return salesFindByAuthorId;
  } catch (error) {
    throw error;
  }
}

export default {
  createSale,
  readAllSale,
  readSale,
  updateSale,
  deleteSale,
  readAllSalesByClientId,
  readAllSalesByBookId,
  readAllSalesByAuthorId,
};
