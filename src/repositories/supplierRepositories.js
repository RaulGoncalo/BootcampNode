import Supplier from '../models/supplierModels.js';

const insertSupplier = async (supplier) => {
    try {
        return await Supplier.create(supplier);
    } catch (error) {
        throw error
    }
};


const getSuppliers = async () => {
    try {
        return await Supplier.findAll();
    } catch (error) {
        throw error
    }
};

const getSupplier = async (id) => {
    try {
        return await Supplier.findByPk(id);
    } catch (error) {
        throw error
    }
};

const deleteSupplier = async (id) => {
    try {
        await Supplier.destroy({
            where: {
                supplierId: id
            }
        });
    } catch (error) {
        throw error
    }
};

const updateSupplier = async (supplier) => {
    try {
        await Supplier.update(supplier, {
            where: {
                supplierId: supplier.supplierId
            }
        });

        return await getSupplier(supplier.supplierId)
    } catch (error) {
        throw error
    }
};


export default {
    insertSupplier,
    getSupplier,
    getSuppliers,
    deleteSupplier,
    updateSupplier,
};