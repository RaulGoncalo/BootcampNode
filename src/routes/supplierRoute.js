import express from 'express';
import supplierControllers from '../controllers/supplierControllers.js';


const route = express.Router();

route.post("/", supplierControllers.creatSupplier);
route.get("/", supplierControllers.getSuppliers);
route.get("/:id", supplierControllers.getSupplier);
route.delete("/:id", supplierControllers.deleteSupplier);
route.put("/", supplierControllers.updateSupplier);

export default route;