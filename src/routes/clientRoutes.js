import express from "express";
import clientControllers from "../controllers/clientControllers.js";
import { authorize } from "../controllers/authControllers.js";

const route = express.Router();

route.post("/", authorize("admin"), clientControllers.createClient);
route.get("/", authorize("admin"), clientControllers.readAllClient);
route.get("/:id", authorize("admin"), clientControllers.readClient);
route.put("/", clientControllers.updateClient);
route.delete("/:id", authorize("admin"), clientControllers.deleteClient);

export default route;
