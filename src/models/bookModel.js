import Sequelize from "sequelize";
import db from "../db/config.js";
import Author from "./authorModel.js";

const Book = db.define(
  "books",
  {
    bookId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

Book.belongsTo(Author, { foreignKey: "authorId" });

export default Book;
