import express from 'express';
import clientControllers from '../controllers/clientControllers.js';


const route = express.Router();

route.post("/", clientControllers.creatClient);
route.get("/", clientControllers.getClients);
route.get("/:id", clientControllers.getClient);
route.delete("/:id", clientControllers.deleteClient);
route.put("/", clientControllers.updateClient);

export default route;