import bookRepositories from "../repositories/bookRepositories.js";
import bookInfoRepositories from "../repositories/bookInfoRepositories.js";
import saleRepositories from "../repositories/saleRepositories.js";

async function createBook(book) {
  return await bookRepositories.createBook(book);
}

async function readAllBook(filterAuthorId) {
  if (filterAuthorId) {
    return await bookRepositories.readBookByAuthorId(parseInt(filterAuthorId));
  }
  return await bookRepositories.readAllBook();
}

async function readBook(idBook) {
  return await bookRepositories.readBook(parseInt(idBook));
}

async function updateBook(book) {
  return await bookRepositories.updateBook(book);
}

async function deleteBook(idBook) {
  const saleByBookId = await saleRepositories.readAllSalesByBookId(
    parseInt(idBook)
  );
  if (saleByBookId.length > 0) {
    throw new Error("Book cannot be deleted as it has sales!");
  }
  return await bookRepositories.deleteBook(idBook);
}

//bookInfo
async function createBookInfo(bookInfo) {
  if (await bookInfoRepositories.readBookInfo(parseInt(bookInfo.bookId))) {
    throw new Error("Book already has information");
  }
  return await bookInfoRepositories.createBookInfo(bookInfo);
}

async function readAllBookInfo() {
  return await bookInfoRepositories.readAllBookInfo();
}

async function updateBookInfo(bookInfo) {
  return await bookInfoRepositories.updateBookInfo(bookInfo);
}

async function deleteBookInfo(idBookInfo) {
  return await bookInfoRepositories.deleteBookInfo(parseInt(idBookInfo));
}

const createRating = async (rating, bookId) => {
  await bookInfoRepositories.createRating(rating, bookId);
};

const deleteRating = async (bookId, index) => {
  await bookInfoRepositories.deleteRating(parseInt(bookId), index);
};

export default {
  createBook,
  readAllBook,
  readBook,
  updateBook,
  deleteBook,
  createBookInfo,
  readAllBookInfo,
  updateBookInfo,
  deleteBookInfo,
  createRating,
  deleteRating,
};
