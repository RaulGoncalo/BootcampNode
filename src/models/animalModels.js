import Sequelize from "sequelize";
import db from '../db/config.js';
import Owner from "./ownerModels.js";

const Animal = db.define('animais', {
    animalId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, { underscored: true });

Animal.belongsTo(Owner, { foreignKey: "proprietarioId" });

export default Animal;