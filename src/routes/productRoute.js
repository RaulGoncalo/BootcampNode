import express from 'express';
import productControllers from '../controllers/productControllers.js';


const route = express.Router();

route.post("/", productControllers.creatProduct);
route.post("/info", productControllers.creatProductInfo);
route.post("/review", productControllers.createReview);
route.get("/", productControllers.getProducts);
route.get("/info", productControllers.getProductsInfo);
route.get("/:id", productControllers.getProduct);
route.delete("/:id", productControllers.deleteProduct);
route.delete("/info/:id", productControllers.deleteProductInfo);
route.delete("/:id/review/:index", productControllers.deleteReview);
route.put("/", productControllers.updateProduct);
route.put("/info", productControllers.updateProductInfo);

export default route;