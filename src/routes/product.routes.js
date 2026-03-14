import { json, Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      messaje: "Lista de productos",
      data: [],
      errors: [],
    });
});

productRouter.post("/", (req, res) => {
  res
    .status(201)
    .json({
      success: true,
      messaje: "Producto creado correctamente",
      data: [],
      errors: [],
    });
});

productRouter.put("/:id", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      messaje: "Producto actualizado correctamente",
      data: [],
      errors: [],
    });
});

export default productRouter;
