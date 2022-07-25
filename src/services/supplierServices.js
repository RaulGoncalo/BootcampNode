import supplierRepositories from "../repositories/supplierRepositories.js";

const creatSupplier = async (supplier) => {
    return await supplierRepositories.insertSupplier(supplier);
};

const getSuppliers = async () => {
    return await supplierRepositories.getSuppliers();
};

const getSupplier = async (id) => {
    return await supplierRepositories.getSupplier(id);
};

const deleteSupplier = async (id) => {
    await supplierRepositories.deleteSupplier(id);
}

const updateSupplier = async (supplier) => {
    return await supplierRepositories.updateSupplier(supplier);
};

export default {
    creatSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier,
};