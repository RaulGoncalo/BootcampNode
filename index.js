import express from 'express';
import carrosRouter from './carrosRouter.js';

const app = express();

app.use("/carros", carrosRouter)

app.listen(3000, () =>{console.log("BACK_EXECUTANDO")})