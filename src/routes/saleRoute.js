import express from 'express';
import saleControllers from '../controllers/saleControllers.js';


const route = express.Router();

route.post("/", saleControllers.creatSale);
route.get("/", saleControllers.getSales);
route.get("/:id", saleControllers.getSale);
route.delete("/:id", saleControllers.deleteSale);
route.put("/", saleControllers.updateSale);

export default route;