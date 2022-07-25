import saleService from '../services/saleServices.js';

const creatSale = async (req, res, next) => {
    try {
        const sale = req.body;

        if (!sale.value || !sale.date || !sale.client_id || !sale.product_id) {
            throw new Error("Valor, data, client_id e product_id são obrigatórios")
        };

        res.status(201).send(await saleService.creatSale(sale))

        logger.info(`POST /sale - ${JSON.stringify(sale)}`);
    } catch (error) {
        next(error)
    }
};

const getSales = async (req, res, next) => {
    try {
        res.send(await saleService.getSales());

        logger.info(`GET /sale - sales`);
    } catch (error) {
        next(error)
    }
};

const getSale = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }
        const sale = await saleService.getSale(id)

        if (!sale) {
            res.status(404).send("Venda não encontrada")
        }

        res.send(sale);

        logger.info(`GET /sale - ${id}`);
    } catch (error) {
        next(error)
    }
};


const deleteSale = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }

        await saleService.deleteSale(id)
        res.status(204).end();

        logger.info(`DELETE /sale - ${id}`);
    } catch (error) {
        next(error)
    }
};

const updateSale = async (req, res, next) => {
    try {
        let sale = req.body;

        if (!sale.sale_id || !sale.value || !sale.date || !sale.client_id || !sale.product_id) {
            throw new Error("Sale_id, valor, data, client_id e product_id são obrigatórios")
        };

        sale = await saleService.updateSale(sale);

        if (!sale) {
            res.status(404).send("Venda não encontrada")
        }

        res.status(200).send(sale);

        logger.info(`PUT /sale - ${JSON.stringify(sale)}`);

    } catch (error) {
        next(error)
    }
};

export default {
    creatSale,
    getSales,
    getSale,
    deleteSale,
    updateSale,
}