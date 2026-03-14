import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProduct);

productRouter.put("/:id", updateProduct);

export default productRouter;
