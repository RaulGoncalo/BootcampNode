import productService from '../services/productServices.js';

const creatProduct = async (req, res, next) => {
    try {
        const product = req.body;

        if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("Nome, descrição, value, estoque e supplier_id são obrigatórios")
        }

        res.status(201).send(await productService.creatProduct(product))

        logger.info(`POST /product - ${JSON.stringify(product)}`);
    } catch (error) {
        next(error)
    }
};

const getProducts = async (req, res, next) => {
    try {
        res.send(await productService.getProducts());

        logger.info(`GET /product - todos productes`);
    } catch (error) {
        next(error)
    }
};

const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }
        const product = await productService.getProduct(id)

        if (!product) {
            res.status(404).send("Produto não encontrado")
        }

        res.send(product);

        logger.info(`GET /product - ${id}`);
    } catch (error) {
        next(error)
    }
};


const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }

        await productService.deleteProduct(id)
        res.status(204).end();

        logger.info(`DELETE /product - ${id}`);
    } catch (error) {
        next(error)
    }
};

const updateProduct = async (req, res, next) => {
    try {
        let product = req.body;

        if (!product.productId || !product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("product_id, Nome, descrição, value, estoque e supplier_id são obrigatórios");
        }

        product = await productService.updateProduct(product);

        if (!product) {
            res.status(404).send("Produto não encontrado")
        }

        res.status(200).send(product);

        logger.info(`PUT /product - ${JSON.stringify(product)}`);

    } catch (error) {
        next(error)
    }
};

export default {
    creatProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}