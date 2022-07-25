import saleRepositories from "../repositories/saleRepositories.js";
import clientRepositories from "../repositories/clientRepositories.js";
import productRepositories from "../repositories/productRepositories.js";

const creatSale = async (sale) => {
    const product = await productRepositories.getProduct(sale.product_id);


    let error = '';
    if (!await clientRepositories.getClient(sale.client_id)) {
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

const getSales = async () => {
    return await saleRepositories.getSales();
};

const getSale = async (id) => {
    return await saleRepositories.getSale(id);
};

const deleteSale = async (id) => {
    const sale = await saleRepositories.getSale(id);

    if (sale) {
        const product = await productRepositories.getProduct(sale.product_id);
        await saleRepositories.deleteSale(id);
        product.stock++;
        await productRepositories.updateProduct(product);
    } else {
        throw new Error("Id da sale não existe");
    }
}

const updateSale = async (sale) => {
    let error = '';

    if (!await clientRepositories.getClient(sale.client_id)) {
        error = "Client_id não existe. ";
    };

    if (!await productRepositories.getProduct(sale.product_id)) {
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