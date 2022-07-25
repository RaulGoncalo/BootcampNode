import express from 'express';
import productControllers from '../controllers/productControllers.js';


const route = express.Router();

route.post("/", productControllers.creatProduct);
route.get("/", productControllers.getProducts);
route.get("/:id", productControllers.getProduct);
route.delete("/:id", productControllers.deleteProduct);
route.put("/", productControllers.updateProduct);

export default route;