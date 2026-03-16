import { ProductModel } from "../models/product.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductModel.findAll();
  return successResponse(res, 200, "Lista de productos", products);
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(Number(id));

  if (!product) {
    const error = new Error(`Producto con ID ${id} no encontrado`);
    error.statusCode = 404;
    return next(error); // Enviamos el error al peaje global
  }

  return successResponse(
    res,
    200,
    "Producto encontrado correctamente",
    product,
  );
});

const createProduct = catchAsync(async (req, res, next) => {
  // Asegúrate de que los aprendices incluyan 'price' aquí
  const { name, categori_id, price } = req.body;

  if (!name || !categori_id || price === undefined) {
    const error = new Error(
      "El nombre, el ID de la categoría (categori_id) y el precio son obligatorios",
    );
    error.statusCode = 400; // Bad Request
    return next(error);
  }

  const newProduct = await ProductModel.create({ name, categori_id, price });
  return successResponse(res, 201, "Producto creado correctamente", newProduct);
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await ProductModel.update(Number(id), req.body);

  if (!updatedProduct) {
    const error = new Error(`Producto con ID ${id} no encontrado`);
    error.statusCode = 404;
    return next(error);
  }

  return successResponse(
    res,
    200,
    "Producto actualizado correctamente",
    updatedProduct,
  );
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const isDeleted = await ProductModel.delete(Number(id));

  if (!isDeleted) {
    const error = new Error(
      `No se pudo eliminar: Producto con ID ${id} no encontrado`,
    );
    error.statusCode = 404;
    return next(error);
  }

  return successResponse(res, 200, "Producto eliminado correctamente");
});

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
