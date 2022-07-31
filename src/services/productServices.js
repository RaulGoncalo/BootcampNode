import productRepositories from "../repositories/productRepositories.js";
import supplierRespositories from "../repositories/supplierRepositories.js";
import saleRepositories from '../repositories/saleRepositories.js';

const creatProduct = async (product) => {
    if (await supplierRespositories.getSupplier(product.supplierId)) {
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
    const sales = await saleRepositories.getSalesByProductId(id);
    if (sales.length > 0) {
        throw new Error("Produto possui vendas")
    }
    await productRepositories.deleteProduct(id);
}

const updateProduct = async (product) => {
    if (await supplierRespositories.getSupplier(product.supplierId)) {
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