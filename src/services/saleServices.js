import saleRepositories from "../repositories/saleRepositories.js";
import bookRepositories from "../repositories/bookRepositories.js";
import clientRepositories from "../repositories/clientRepositories.js";

async function createSale(sale) {
  const book = await bookRepositories.readBook(parseInt(sale.bookId));
  const client = await clientRepositories.readClient(parseInt(sale.clientId));

  if (!book) {
    throw new Error("Book does not exist!");
  }

  if (!client) {
    throw new Error("Client does not exist!");
  }

  if (book.stock > 0) {
    const saleWithValue = { ...sale, value: book.value };
    let bookReductionStock = {
      ...book,
      stock: book.stock - 1,
    };

    await bookRepositories.updateBook(bookReductionStock);

    return await saleRepositories.createSale(saleWithValue);
  } else {
    throw new Error("Out of stock book!");
  }
}

async function readAllSale(
  email,
  filterByClientId,
  filterByBookId,
  filetrByAuthorId
) {
  const clientIdFilter = await clientRepositories.readClient(filterByClientId);

  const clientAuthenticated = await clientRepositories.readClientByEmail(email);

  if (filterByClientId) {
    if (email === "admin") {
      return await saleRepositories.readAllSalesByClientId(
        parseInt(filterByClientId)
      );
    }

    if (clientIdFilter.clientId !== clientAuthenticated.clientId) {
      throw new Error("Unauthorized");
    }

    return await saleRepositories.readAllSalesByClientId(
      parseInt(filterByClientId)
    );
  }

  if (filterByBookId) {
    if (clientAuthenticated) {
      throw new Error("Unauthorized");
    }

    return await saleRepositories.readAllSalesByBookId(
      parseInt(filterByBookId)
    );
  }

  if (filetrByAuthorId) {
    if (clientAuthenticated) {
      throw new Error("Unauthorized");
    }

    return await saleRepositories.readAllSalesByAuthorId(
      parseInt(filetrByAuthorId)
    );
  }

  return await saleRepositories.readAllSale();
}

async function readSale(idSale) {
  return await saleRepositories.readSale(idSale);
}

async function updateSale(sale) {
  return await saleRepositories.updateSale(sale);
}

async function deleteSale(idSale) {
  return await saleRepositories.deleteSale(idSale);
}

export default {
  createSale,
  readAllSale,
  readSale,
  updateSale,
  deleteSale,
};
