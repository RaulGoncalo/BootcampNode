import Sequelize from "sequelize";
import db from '../db/config.js';

const Owner = db.define('proprietarios', {
    proprietarioId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { underscored: true });

export default Owner;