import express from 'express';
import AccountController from '../controllers/accontsControllers.js';

const router = express.Router();

router.post('/', AccountController.creatAccount);
router.get("/", AccountController.getAccounts);
router.get("/:id", AccountController.getAccount);
router.delete("/:id", AccountController.deleteAccount);
//atualizar os recursos de forma integrais
router.put("/", AccountController.updateAccount);
//atualiza os recursos de forma parciais 
router.patch("/updateBalance", AccountController.updateBalance);

router.use((erro, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} ${erro.message}`);
    res.status(400).send({ error: erro.message });
});

export default router;