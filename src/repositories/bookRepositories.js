import Book from "../models/bookModel.js";
import Author from "../models/authorModel.js";
import bookInfoRepositories from "./bookInfoRepositories.js";

async function createBook(book) {
  try {
    const bookCreated = await Book.create(book);
    return bookCreated;
  } catch (error) {
    throw error;
  }
}

async function readAllBook() {
  try {
    const allBookFinded = await Book.findAll({});
    return allBookFinded;
  } catch (error) {
    throw error;
  }
}

async function readBook(idBook) {
  try {
    let bookFinded = await Book.findOne({
      where: {
        bookId: idBook,
      },
    });
    if (!bookFinded) {
      return bookFinded;
    }
    const infos = await bookInfoRepositories.readBookInfo(idBook);

    bookFinded = { ...bookFinded.dataValues, informations: infos };

    return bookFinded;
  } catch (error) {
    throw error;
  }
}

async function updateBook(book) {
  try {
    await Book.update(book, {
      where: {
        bookId: book.bookId,
      },
    });
    return await readBook(book.bookId);
  } catch (error) {
    throw error;
  }
}

async function deleteBook(idBook) {
  try {
    await Book.destroy({
      where: {
        bookId: idBook,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function readBookByAuthorId(idAuthor) {
  try {
    const bookByAuthorId = await Book.findAll({
      where: {
        authorId: idAuthor,
      },
      include: {
        model: Author,
      },
    });

    return bookByAuthorId;
  } catch (error) {
    throw error;
  }
}
export default {
  createBook,
  readAllBook,
  readBook,
  updateBook,
  deleteBook,
  readBookByAuthorId,
};
