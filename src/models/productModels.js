import Sequelize from "sequelize";
import db from '../db/config.js';
import Supplier from './supplierModels.js';

const Product = db.define('products', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { underscored: true });


//criar associação - relação das tabelas 
Product.belongsTo(Supplier, { foreignKey: "supplierId" });


export default Product;