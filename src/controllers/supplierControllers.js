import supplierService from '../services/supplierServices.js';

const creatSupplier = async (req, res, next) => {
    try {
        const supplier = req.body;

        if (!supplier.name || !supplier.cnpj || !supplier.email || !supplier.phone || !supplier.address) {
            throw new Error("Nome, CNPJ, e-mail, telefone e endereço são obrigatórios")
        }

        res.status(201).send(await supplierService.creatSupplier(supplier))

        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
    } catch (error) {
        next(error)
    }
};

const getSuppliers = async (req, res, next) => {
    try {
        res.send(await supplierService.getSuppliers());

        logger.info(`GET /supplier - todos supplieres`);
    } catch (error) {
        next(error)
    }
};

const getSupplier = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }
        const supplier = await supplierService.getSupplier(id)

        if (!supplier) {
            res.status(404).send("Fornecedor não encontrado")
        }

        res.send(supplier);

        logger.info(`GET /supplier - ${id}`);
    } catch (error) {
        next(error)
    }
};


const deleteSupplier = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("ID obrigatório")
        }

        await supplierService.deleteSupplier(id)
        res.status(204).end();

        logger.info(`DELETE /supplier - ${id}`);
    } catch (error) {
        next(error)
    }
};

const updateSupplier = async (req, res, next) => {
    try {
        let supplier = req.body;

        if (!supplier.supplierId || !supplier.name || !supplier.cnpj || !supplier.email || !supplier.phone || !supplier.address) {
            throw new Error("supplier_id, Nome, CNPJ, e-mail, telefone e endereço são obrigatórios");
        }

        supplier = await supplierService.updateSupplier(supplier);

        if (!supplier) {
            res.status(404).send("Fornecedor não encontrado")
        }

        res.status(200).send(supplier);

        logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);

    } catch (error) {
        next(error)
    }
};

export default {
    creatSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier,
}