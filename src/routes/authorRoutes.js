import express from "express";
import authorControllers from "../controllers/authorControllers.js";

const route = express.Router();

route.post("/", authorControllers.createAuthor);
route.get("/", authorControllers.readAllAuthor);
route.get("/:id", authorControllers.readAuthor);
route.put("/", authorControllers.updateAuthor);
route.delete("/:id", authorControllers.deleteAuthor);

export default route;
