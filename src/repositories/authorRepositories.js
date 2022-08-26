import Author from "../models/authorModel.js";

async function createAuthor(author) {
  try {
    const authorCreated = await Author.create(author);
    return authorCreated;
  } catch (error) {
    throw error;
  }
}

async function readAllAuthor() {
  try {
    const allAuthorFinded = await Author.findAll();
    return allAuthorFinded;
  } catch (error) {
    throw error;
  }
}

async function readAuthor(idAuthor) {
  try {
    const authorFinded = await Author.findByPk(idAuthor);
    return authorFinded;
  } catch (error) {
    throw error;
  }
}

async function updateAuthor(author) {
  try {
    await Author.update(author, {
      where: {
        authorId: author.authorId,
      },
    });
    return await readAuthor(author.authorId);
  } catch (error) {
    throw error;
  }
}

async function deleteAuthor(idAuthor) {
  try {
    await Author.destroy({
      where: {
        authorId: idAuthor,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default {
  createAuthor,
  readAllAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
};
