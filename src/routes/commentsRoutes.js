import express from 'express';
import blogControllers from '../controllers/blogControllers.js';

const router = express.Router();

router.post("/", blogControllers.createComments);

export default router;