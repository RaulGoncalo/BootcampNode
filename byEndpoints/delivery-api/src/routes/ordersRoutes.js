import express from 'express';
import OrdersControllers from '../controllers/ordersControllers.js'

const router = express.Router();

router.post("/", OrdersControllers.createOrder);

router.get("/", OrdersControllers.getOrders);
router.get("/:id", OrdersControllers.getOrder);
router.get("/cliente/total/:client", OrdersControllers.amountOrderClient);
router.get("/produtos/total/:food", OrdersControllers.amountOrderFood);
router.get("/produtos/mais-pedidos", OrdersControllers.rankingFood);

router.put("/", OrdersControllers.updateOrder);

router.patch("/", OrdersControllers.updateDelivery);

router.delete("/:id", OrdersControllers.deleteOrder);


router.use((erro, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} ${erro.message}`);
    res.status(400).send({ error: erro.message });
});

export default router;