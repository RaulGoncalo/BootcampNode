import Product from '../models/productModels.js';

const insertProduct = async (product) => {
    try {
        return await Product.create(product);
    } catch (error) {
        throw error
    }
};


const getProducts = async () => {
    try {
        return await Product.findAll();
    } catch (error) {
        throw error
    }
};

const getProduct = async (id) => {
    try {
        return await Product.findByPk(id, { raw: true });
    } catch (error) {
        throw error
    }
};

const deleteProduct = async (id) => {
    try {
        await Product.destroy({
            where: {
                productId: id
            }
        });
    } catch (error) {
        throw error
    }
};

const updateProduct = async (product) => {
    try {
        await Product.update(product, {
            where: {
                productId: product.productId
            }
        });

        return await getProduct(product.productId)
    } catch (error) {
        throw error
    }
};


export default {
    insertProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
};