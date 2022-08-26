import authorRepositories from "../repositories/authorRepositories.js";
import bookRepositories from "../repositories/bookRepositories.js";

async function createAuthor(author) {
  return await authorRepositories.createAuthor(author);
}

async function readAllAuthor() {
  return await authorRepositories.readAllAuthor();
}

async function readAuthor(idAuthor) {
  return await authorRepositories.readAuthor(parseInt(idAuthor));
}

async function updateAuthor(author) {
  return await authorRepositories.updateAuthor(author);
}

async function deleteAuthor(idAuthor) {
  const authorBook = await bookRepositories.readBookByAuthorId(
    parseInt(idAuthor)
  );

  if (authorBook.length > 0) {
    throw new Error("Author has books!");
  }

  return await authorRepositories.deleteAuthor(parseInt(idAuthor));
}

export default {
  createAuthor,
  readAllAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
};
