import Sale from '../models/saleModels.js';
import Product from '../models/productModels.js';
import Client from '../models/clientModels.js';

const insertSale = async (sale) => {
    try {
        return await Sale.create(sale);
    } catch (error) {
        throw error
    }
};


const getSales = async () => {
    try {
        return await Sale.findAll({
            include: [
                {
                    model: Client
                },

                {
                    model: Product
                }
            ]
        });
    } catch (error) {
        throw error
    }
};

const getSalesByProductId = async (productId) => {
    try {
        return await Sale.findAll({
            where: {
                productId: productId
            },
            include: {
                model: Client
            }
        });
    } catch (error) {
        throw error
    }
};

const getSalesBySupplierId = async (supplierId) => {
    try {
        return await Sale.findAll({
            include: [
                {
                    model: Product,
                    where: {
                        supplierId: supplierId
                    }
                }
            ]
        });
    } catch (error) {
        throw error
    }
};


const getSale = async (id) => {
    try {
        return await Sale.findByPk(id);
    } catch (error) {
        throw error
    }
};

const deleteSale = async (id) => {
    try {
        await Sale.destroy({
            where: {
                saleId: id
            }
        });
    } catch (error) {
        throw error
    }
};

const updateSale = async (sale) => {
    try {
        await Sale.update(
            {
                value: sale.value,
                date: sale.date,
                clientId: sale.clientId
            },

            {
                where: {
                    saleId: sale.saleId
                }
            }
        );

        return await getSale(sale.saleId)
    } catch (error) {
        throw error
    }
};


export default {
    insertSale,
    getSale,
    getSalesByProductId,
    getSales,
    deleteSale,
    updateSale,
    getSalesBySupplierId
};