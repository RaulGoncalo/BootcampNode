import express from "express";
import saleControllers from "../controllers/saleControllers.js";
import { authorize } from "../controllers/authControllers.js";

const route = express.Router();

route.post("/", saleControllers.createSale);
route.get("/", saleControllers.readAllSale);
route.get("/:id", authorize("admin"), saleControllers.readSale);
route.put("/", authorize("admin"), saleControllers.updateSale);
route.delete("/:id", authorize("admin"), saleControllers.deleteSale);

export default route;
