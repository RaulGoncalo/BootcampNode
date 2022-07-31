import Sequelize from 'sequelize';
import db from '../db/config.js';
import Product from './productModels.js';
import Client from './clientModels.js';

const Sale = db.define('sales', {
    saleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, { underscored: true });

Sale.belongsTo(Client, { foreignKey: "clientId" });
Sale.belongsTo(Product, { foreignKey: "productId" });

export default Sale;
