import Sequelize from "sequelize";
import db from "../db/config.js";
import Client from "./clientModel.js";
import Book from "./bookModel.js";

const Sale = db.define(
  "sales",
  {
    saleId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Sale.belongsTo(Client, { foreignKey: "clientId" });
Sale.belongsTo(Book, { foreignKey: "bookId" });

export default Sale;
