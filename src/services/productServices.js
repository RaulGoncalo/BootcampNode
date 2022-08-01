import productRepositories from "../repositories/productRepositories.js";
import supplierRespositories from "../repositories/supplierRepositories.js";
import saleRepositories from '../repositories/saleRepositories.js';
import productInfoRepositories from "../repositories/productInfoRepositories.js";

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
    const product = await productRepositories.getProduct(id);
    product.info = await productInfoRepositories.getProductInfo(parseInt(id));
    return product
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

const creatProductInfo = async (productInfo) => {
    if (await productInfoRepositories.getProductInfo(parseInt(productInfo.productId))) {
        throw new Error("Produto já possui informações")
    }
    return await productInfoRepositories.creatProductInfo(productInfo);
};

const updateProductInfo = async (productInfo) => {
    return await productInfoRepositories.upadteProductInfo(productInfo);
};

const createReview = async (review, productId) => {
    await productInfoRepositories.createReview(review, productId);
};

const deleteReview = async (productId, index) => {
    await productInfoRepositories.deleteReview(parseInt(productId), index);
};

const getProductsInfo = async () => {
    return await productInfoRepositories.getProductsInfo();
};

const deleteProductInfo = async (productId) => {
    await productInfoRepositories.deleteProductInfo(parseInt(productId));
};

export default {
    creatProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    updateProductInfo,
    creatProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
};