import express from "express";
import bookControllers from "../controllers/bookControllers.js";
import { authorize } from "../controllers/authControllers.js";

const route = express.Router();

route.post("/info", authorize("admin"), bookControllers.createBookInfo);
route.get("/info", authorize("admin"), bookControllers.readAllBookInfo);
route.put("/info", authorize("admin"), bookControllers.updateBookInfo);
route.delete("/info/:id", authorize("admin"), bookControllers.deleteBookInfo);

route.post("/:id/rating", bookControllers.createRating);
route.delete(
  "/:id/rating/:index",
  authorize("admin"),
  bookControllers.deleteRating
);

route.post("/", authorize("admin"), bookControllers.createBook);
route.get("/", bookControllers.readAllBook);
route.get("/:id", bookControllers.readBook);
route.put("/", authorize("admin"), bookControllers.updateBook);
route.delete("/:id", authorize("admin"), bookControllers.deleteBook);

export default route;
