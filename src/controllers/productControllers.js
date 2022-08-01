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
        next(error);
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
        next(error);
    }
};

const creatProductInfo = async (req, res, next) => {
    try {
        const productInfo = req.body;

        if (!productInfo.productId) {
            throw new Error("ProductId é obrigatório");
        }

        await productService.creatProductInfo(productInfo);

        res.end();
        logger.info(`POST /procut/info ${JSON.stringify(productInfo)}`);
    } catch (error) {
        next(error);
    }
};


const updateProductInfo = async (req, res, next) => {
    try {
        const productInfo = req.body;

        if (!productInfo.productId) {
            throw new Error("ProductId é obrigatório");
        }

        await productService.updateProductInfo(productInfo);

        res.end();
        logger.info(`PUT /procut/info ${JSON.stringify(productInfo)}`);
    } catch (error) {
        next(error);
    }
};

const createReview = async (req, res, next) => {
    try {
        const params = req.body;

        if (!params.review || !params.productId) {
            throw new Error("Reviews e productId são obrigatórios");
        }

        await productService.createReview(params.review, params.productId);
        res.end();
        logger.info(`POST /product/review`);
    } catch (error) {
        next(error);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        await productService.deleteReview(req.params.id, req.params.index);
        res.end();
        logger.info(`DELETE /product/${req.params.id}/review/${req.params.index}`);
    } catch (error) {
        next(error);
    }
};


const getProductsInfo = async (req, res, next) => {
    try {
        res.send(await productService.getProductsInfo());

        logger.info(`GET /product/info - todos productsInfo`);
    } catch (error) {
        next(error)
    }
};

const deleteProductInfo = async (req, res, next) => {
    try {
        await productService.deleteProductInfo(req.params.id);
        res.end();
        logger.info(`DELETE /product/info`);
    } catch (error) {
        next(error)
    }
}

export default {
    creatProduct,
    creatProductInfo,
    updateProductInfo,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}