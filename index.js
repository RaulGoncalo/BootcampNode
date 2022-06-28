import express from 'express';
import carsRouters from './routers/cars.js';

global.fileName = "car-list.json";


const app = express();
app.use(express.json());

app.use("/marcas", carsRouters)

app.listen(3000, () =>{
    console.log("API_EXECUTANDO")
});