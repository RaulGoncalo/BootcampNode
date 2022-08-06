import Sequelize from 'sequelize';
import db from '../db/config.js';
import Animal from './animalModels.js';

const Service = db.define('servicos', {
    servicoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { underscored: true });

Service.belongsTo(Animal, { foreignKey: 'animalId' });

export default Service