import { ProductModel } from "../models/product.model.js";

const getAllProducts = (req, res) => {
  const products = ProductModel.findAll();
  res.status(200).json({
    success: true,
    messaje: "Lista de productos",
    data: products,
    errors: [],
  });
};

const createProduct = (req, res) => {
  const newProduct =  ProductModel.create();
  res.status(201).json({
    success: true,
    messaje: "Producto creado correctamente",
    data: newProduct,
    errors: [],
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedProduct = ProductModel.update(Number(id));
  res.status(200).json({
    success: true,
    messaje: "Producto actualizado correctamente",
    data: updatedProduct,
    errors: [],
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const deleteProduct = ProductModel.delete(Number(id));
  res.status(200).json({
    success: true,
    messaje: "Producto eliminado correctamente",
    data: deleteProduct,
    errors: [],
  });  
}

export { getAllProducts, createProduct, updateProduct, deleteProduct };
