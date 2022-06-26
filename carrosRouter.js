import express from 'express';

const router = express.Router();

router.get("/", (req, res )=>{
    res.send("GET - Carros")
});


router.get("/precos", (req, res )=>{
    res.send("GET PREÇOS - Carros")
});

export default router