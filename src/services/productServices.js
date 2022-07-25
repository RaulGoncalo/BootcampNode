import productRepositories from "../repositories/productRepositories.js";
import supplierRespositories from "../repositories/supplierRepositories.js";

const creatProduct = async (product) => {
    if (await supplierRespositories.getSupplier(product.supplier_id)) {
        return await productRepositories.insertProduct(product);
    }

    throw new Error("Supplier_id não existe");
};

const getProducts = async () => {
    return await productRepositories.getProducts();
};

const getProduct = async (id) => {
    return await productRepositories.getProduct(id);
};

const deleteProduct = async (id) => {
    await productRepositories.deleteProduct(id);
}

const updateProduct = async (product) => {
    if (await supplierRespositories.getSupplier(product.supplier_id)) {
        return await productRepositories.updateProduct(product);
    }

    throw new Error("Supplier_id não existe");
};

export default {
    creatProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};