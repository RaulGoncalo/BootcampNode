import OrdersServices from '../services/ordersServices.js'

const createOrder = async (req, res, next) => {
    try {
        let order = req.body;

        if (!order.client || !order.food || !order.value) {
            throw new Error("Cliente, comida e valor são obirgatórios");
        }

        const orderCreated = await OrdersServices.createOrder(order);

        logger.info(`${req.method} ${req.baseUrl} Order: ${orderCreated.id} - criado`);

        res.send(orderCreated);

    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        let order = req.body
        if (!order.id || !order.client || !order.food || !order.value) {
            throw new Error("ID, cliente, produto e valor são obrigatórios");
        }

        const orderChanged = await OrdersServices.updateOrder(order);


        logger.info(`${req.method} ${req.baseUrl} Order: ${order.id} - atualizado`);


        res.send(orderChanged);
    } catch (error) {
        next(error);
    }
}

const getOrders = async (req, res, next) => {
    try {
        logger.info(`${req.method} ${req.baseUrl} - busca de pedidos`);

        res.send(await OrdersServices.getOrders());
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        let id = req.params.id;

        logger.info(`${req.method} ${req.baseUrl} Busca Order: ${id} - busca`);

        res.send(await OrdersServices.getOrder(id));
    } catch (error) {
        next(error);
    }
};

const updateDelivery = async (req, res, next) =>{
    try {
        let changeDeliveryOrder = req.body;
        console.log(req.body.delivery)

        if(!changeDeliveryOrder.id || changeDeliveryOrder.delivery === null || changeDeliveryOrder.delivery === undefined){
            throw new Error("id e entregue são obrigatórios");
        }

        logger.info(`${req.method} ${req.baseUrl} Delivery Order: ${changeDeliveryOrder.id} - atualizado`);

        res.send(await OrdersServices.updateDelivery(changeDeliveryOrder));

    } catch (error) {
        next(error);
    }
};

const deleteOrder =  async (req, res, next) => {
    try {
        if(!req.params.id){
            throw new Error("Informe um ID");
        }

        await OrdersServices.deleteOrder(req.params.id)

        logger.info(`${req.method} ${req.baseUrl} Delete Order: ${req.params.id} - deletado`);

        res.send({message: "Pedido deletado"});

    } catch (error) {
        next(error);
    }
}

const amountOrderClient = async (req, res, next) =>{
    try {
        if(!req.params){
            throw new Error("Informe um cliente");
        }

        const total = await OrdersServices.amountOrderClient(req.params.client);

        logger.info(`${req.method} ${req.baseUrl} Total Client Order: ${req.params.client}`);

        res.send({message: total});

    } catch (error) {
        next(error);
    }
}

const amountOrderFood = async (req, res, next) =>{
    try {
        if(!req.params){
            throw new Error("Informe um produto");
        }

        const total = await OrdersServices.amountOrderFood(req.params.food);

        logger.info(`${req.method} ${req.baseUrl} Total Food Order: ${req.params.food}`);

        res.send({message: total});

    } catch (error) {
        next(error);
    }
};


const rankingFood = async (_, res, next) =>{
    try {
        logger.info(`${req.method} ${req.baseUrl} List Total Food Order`);

        res.send(await OrdersServices.rankingFood());
    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    updateDelivery,
    deleteOrder,
    amountOrderClient,
    amountOrderFood,
    rankingFood
}