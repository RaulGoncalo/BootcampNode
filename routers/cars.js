import express from 'express';
import { promises as fs } from 'fs';
import {findBrandMoreModels , findBrandLessModels, findBrandMoreModelsWithParams, findBrandLessModelsWithParams, findModels} from '../functions.js';

const { readFile, writeFile } = fs

const router = express.Router();

router.get("/maisModelos", async (req, res, next) => {
    try {
        const moreModels = await findBrandMoreModels();

        res.send(moreModels);
    } catch (erro) {
        next(erro)
    }
});

router.get("/menosModelos", async (req, res, next) => {
    try {
        const lessModels = await findBrandLessModels();
        res.send(lessModels);
    } catch (erro) {
        next(erro)
    }
});

router.get("/listaMaisModelos/:id", async (req, res, next) => {
    try {
        if(!req.params.id || req.params.id === '0' ){
            throw new Error("Parametros invalidos")
        }
        const listMoreModels = await findBrandMoreModelsWithParams(req.params.id);

        res.send(listMoreModels);
    } catch (erro) {
        next(erro)
    }
});


router.get("/listaMenosModelos/:id", async (req, res, next) => {
    try {
        if(!req.params.id || req.params.id === '0' ){
            throw new Error("Parametros invalidos")
        }
        const listMoreModels = await findBrandLessModelsWithParams(req.params.id);

        res.send(listMoreModels);
    } catch (erro) {
        next(erro)
    }
});

router.post("/listaModelos", async (req, res, next) => {
    try {
        const listModels = await findModels(req.body.nomeMarca);

        res.send(listModels);
    } catch (erro) {
        next(erro)
    }
});

router.use((error, req, res, next) => {
    res.send({ error: error.message })
});

export default router;