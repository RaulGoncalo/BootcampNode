import bookServices from "../services/bookServices.js";

async function createBook(req, res, next) {
  try {
    const book = req.body;
    if (!book.name || !book.value || !book.stock || !book.authorId) {
      throw new Error("Name, value, stock and authorId are mandatory");
    }
    res.status(201).send(await bookServices.createBook(book));

    logger.info(`POST /book - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function readAllBook(req, res, next) {
  try {
    const filterAuthorId = req.query.authorId;

    res.send(await bookServices.readAllBook(filterAuthorId));

    logger.info(`GET /book - todos clientes`);
  } catch (error) {
    next(error);
  }
}

async function readBook(req, res, next) {
  try {
    const idBook = req.params.id;
    res.send(await bookServices.readBook(idBook));

    logger.info(`GET /book - ${idBook}`);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const book = req.body;
    if (!book.bookId || !book.value || !book.stock) {
      throw new Error("Value, stock and authorId are mandatory");
    }
    if (book.name || book.authorId) {
      throw new Error("Name and AuthorId cannot be changed!");
    }

    res.send(await bookServices.updateBook(book));

    logger.info(`PUT /book - ${JSON.stringify(book)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const idBook = req.params.id;
    if (!idBook) {
      throw new Error("BookId is mandatory");
    }
    res.send(await bookServices.deleteBook(idBook));

    logger.info(`DELETE /book - ${idBook}`);
  } catch (error) {
    next(error);
  }
}

//bookinfo
async function createBookInfo(req, res, next) {
  try {
    const bookInfo = req.body;

    if (!bookInfo.bookId) {
      throw new Error("ProductId é obrigatório");
    }

    await bookServices.createBookInfo(bookInfo);

    res.end();
    logger.info(`POST /procut/info ${JSON.stringify(bookInfo)}`);
  } catch (error) {
    next(error);
  }
}

async function readAllBookInfo(req, res, next) {
  try {
    res.send(await bookServices.readAllBookInfo());

    logger.info(`GET /book/info - todos booksInfo`);
  } catch (error) {
    next(error);
  }
}

async function updateBookInfo(req, res, next) {
  try {
    const bookInfo = req.body;

    if (!bookInfo.bookId) {
      throw new Error("ProductId é obrigatório");
    }

    await bookServices.updateBookInfo(bookInfo);

    res.end();
    logger.info(`PUT /procut/info ${JSON.stringify(bookInfo)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteBookInfo(req, res, next) {
  try {
    const idBookInfo = req.params.id;
    if (!idBookInfo) {
      throw new Error("BookInfoId is mandatory");
    }
    res.send(await bookServices.deleteBookInfo(idBookInfo));

    logger.info(`DELETE /bookInfo - ${idBookInfo}`);
  } catch (error) {
    next(error);
  }
}

const createRating = async (req, res, next) => {
  try {
    const params = req.body;
    const bookId = req.params.id;

    if (!params.rating || !bookId) {
      throw new Error("Rating e bookId são obrigatórios");
    }

    await bookServices.createRating(params.rating, bookId);
    res.end();
    logger.info(`POST /book/rating`);
  } catch (error) {
    next(error);
  }
};

const deleteRating = async (req, res, next) => {
  try {
    await bookServices.deleteRating(req.params.id, req.params.index);
    res.end();
    logger.info(`DELETE /book/${req.params.id}/rating/${req.params.index}`);
  } catch (error) {
    next(error);
  }
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
