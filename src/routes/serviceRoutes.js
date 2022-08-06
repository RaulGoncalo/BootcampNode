import express from 'express';
import serviceControllers from '../controllers/serviceControllers.js';

const router = express.Router();

router.post("/", serviceControllers.createService);
router.get("/", serviceControllers.getServices)

export default router;