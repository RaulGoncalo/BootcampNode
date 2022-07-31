import saleRepositories from "../repositories/saleRepositories.js";
import clientRepositories from "../repositories/clientRepositories.js";
import productRepositories from "../repositories/productRepositories.js";

const creatSale = async (sale) => {
    const product = await productRepositories.getProduct(sale.productId);


    let error = '';
    if (!await clientRepositories.getClient(sale.clientId)) {
        error = "Client_id não existe. ";
    };

    if (!product) {
        error += "Product_id não existe. ";
    };

    if (error) {
        throw new Error(error);
    };

    if (product.stock > 0) {
        sale = await saleRepositories.insertSale(sale);
        product.stock--;
        await productRepositories.updateProduct(product);

        return sale;
    } else {
        throw new Error("Produto sem estoque")
    }
};

const getSales = async (productId, supplierId) => {
    if (productId) {
        return await saleRepositories.getSalesByProductId(productId)
    }
    if (supplierId) {
        return await saleRepositories.getSalesBySupplierId(supplierId)
    }
    return await saleRepositories.getSales();
};

const getSale = async (id) => {
    return await saleRepositories.getSale(id);
};

const deleteSale = async (id) => {
    const sale = await saleRepositories.getSale(id);

    if (sale) {
        const product = await productRepositories.getProduct(sale.productId);
        await saleRepositories.deleteSale(id);
        product.stock++;
        await productRepositories.updateProduct(product);
    } else {
        throw new Error("Id da sale não existe");
    }
}

const updateSale = async (sale) => {
    let error = '';

    if (!await clientRepositories.getClient(sale.clientId)) {
        error = "Client_id não existe. ";
    };

    if (!await productRepositories.getProduct(sale.productId)) {
        error += "Product_id não existe. ";
    };

    if (error) {
        throw new Error(error);
    }

    return await saleRepositories.updateSale(sale);
};

export default {
    creatSale,
    getSales,
    getSale,
    deleteSale,
    updateSale,
};