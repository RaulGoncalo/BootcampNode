import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const db = "pedidos.json";


const insertOrder = async (order) => {
    const data = JSON.parse(await readFile(db));

    order = {
        id: data.nextId++,
        cliente: order.client,
        produto: order.food,
        valor: parseFloat(order.value),
        entregue: false,
        timestamp: new Date()
    }

    data.pedidos.push(order);

    await writeFile(db, JSON.stringify(data, null, 2));

    return order;
};

const updateOrder = async (order) => {
    const data = JSON.parse(await readFile(db));

    if (!data.pedidos.find(item => item.produto === order.food)) {
        throw new Error("Produto não cadastrado");
    }

    order = {
        id: parseInt(order.id),
        cliente: order.client,
        produto: order.food,
        valor: parseFloat(order.value),
        entregue: order.deliver,
        timestamp: new Date()
    };

    let i = data.pedidos.findIndex(a => a.id === parseInt(order.id));

    data.pedidos[i] = order;

    await writeFile(db, JSON.stringify(data, null, 2));

    order = data.pedidos[i];
    return order;
};

const getOrders = async () => {
    const data = JSON.parse(await readFile(db));
    return data.pedidos
};

const getOrder = async (id) => {
    const data = JSON.parse(await readFile(db));

    let index = data.pedidos.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
        throw new Error("ID não encontrado")
    }

    return data.pedidos[index];
}

const updateDelivery = async (changeDeliveryOrder) => {
    let data = JSON.parse(await readFile(db));

    let index = data.pedidos.findIndex(item => item.id === parseInt(changeDeliveryOrder.id));

    data.pedidos[index].entregue = changeDeliveryOrder.delivery;

    await writeFile(db, JSON.stringify(data, null, 2));

    return data.pedidos[index];
};

const deleteOrder = async (id) => {
    let data = JSON.parse(await readFile(db));

    let index = data.pedidos.findIndex(item => item.id === parseInt(id));

    data.pedidos.splice(index, 1);

    await writeFile(db, JSON.stringify(data, null, 2));
};

const amountOrderClient = async (client) => {
    const data = await getOrders();
    let total = 0

    for (let i = 0; i < data.length; i++) {
        if (data[i].cliente === client && data[i].entregue === true) {
            total = total + data[i].valor

        };
    }

    return total;
};

const amountOrderFood = async (food) => {
    const data = await getOrders();
    let total = 0

    for (let i = 0; i < data.length; i++) {
        if (data[i].produto === food && data[i].entregue === true) {
            total = total + data[i].valor

        };
    }

    return total;
};

const rankingFood = async () => {
    const data = JSON.parse(await readFile(db));
    let foods = []

    for (let i = 0; i < data.pedidos.length; i++) {
        if (foods.find(item => item === data.pedidos[i].produto) === undefined) {
            foods.push(data.pedidos[i].produto)
        }
    }

    for (let i = 0; i < foods.length; i++) {
        foods[i] = `${foods[i]} - ${data.pedidos.filter(item => item.entregue && item.produto === foods[i]).length}`
    }

    foods.sort((a, b) => {
        return a.split("-", 2)[1] > b.split("-", 2)[1] ? -1 : a.split("-", 2) < b.split("-", 2) ? 1 : 0
    })

    return foods;
}

export default {
    insertOrder,
    getOrders,
    updateOrder,
    getOrder,
    updateDelivery,
    deleteOrder,
    amountOrderClient,
    amountOrderFood,
    rankingFood,
}
