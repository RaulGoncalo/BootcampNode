import express from 'express';
import animalControllers from '../controllers/animalControllers.js';

const router = express.Router();

router.post("/", animalControllers.insertAnimal);
router.get("/", animalControllers.getAnimals);
router.get("/:id", animalControllers.getAnimal);
router.delete("/:id", animalControllers.deleteAnimal);
router.put("/", animalControllers.updateAnimal);

export default router;