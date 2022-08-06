import express from 'express';
import blogControllers from '../controllers/blogControllers.js';

const router = express.Router();

router.post("/", blogControllers.createPosts);
router.get("/", blogControllers.getPosts)

export default router;