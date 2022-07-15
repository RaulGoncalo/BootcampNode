import ServerOrder from '../server/serversOrders.js';

const createOrder = async (order) => {
    return await ServerOrder.insertOrder(order);
};

const updateOrder = async (order) => {
    return await ServerOrder.updateOrder(order);
};

const getOrders = async () => {
    return await ServerOrder.getOrders();
};

const getOrder = async (id) => {
    return await ServerOrder.getOrder(id);
};

const updateDelivery = async (changeDeliveryOrder) => {
    return await ServerOrder.updateDelivery(changeDeliveryOrder);
};

const deleteOrder = async (id) => {
    return await ServerOrder.deleteOrder(id);
};

const amountOrderClient = async (client) => {
    return await ServerOrder.amountOrderClient(client);
}

const amountOrderFood = async (food) => {
    return await ServerOrder.amountOrderFood(food);
}

const rankingFood = async () => {
    return await ServerOrder.rankingFood();
}

export default {
    createOrder,
    getOrders,
    updateOrder,
    updateDelivery,
    getOrder,
    deleteOrder,
    amountOrderClient,
    amountOrderFood,
    rankingFood,
}