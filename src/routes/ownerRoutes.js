import express from 'express';
import ownerControllers from '../controllers/ownerControllers.js';

const router = express.Router();

router.post("/", ownerControllers.insertOwner);
router.get("/", ownerControllers.getOwners);
router.get("/:id", ownerControllers.getOwner);
router.delete("/:id", ownerControllers.deleteOwner);
router.put("/", ownerControllers.updateOwner);

export default router;