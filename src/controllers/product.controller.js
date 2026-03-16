import { ProductModel } from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).json({
      success: true,
      message: "Lista de productos",
      data: products,
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error interno al obtener los productos",
      data: [],
      errors: [error.message],
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(Number(id));

    // Validamos si el producto existe
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto encontrado correctamente",
      data: product,
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error interno al procesar la búsqueda",
      data: [],
      errors: [error.message],
    });
  }
};

const createProduct = async (req, res) => {
  try {
    // justado al esquema SQL real: name y categori_id
    const { name, categori_id, price } = req.body;

    // Validación estricta para la base de datos
    if (!name || !categori_id || !price) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre, precio o el ID de la categoría (categori_id) son obligatorios",
        data: [],
        errors: [],
      });
    }

    const newProduct = await ProductModel.create({ name, categori_id });
    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: newProduct,
      errors: [],
    });
  } catch (error) {
    // Si envían un categori_id que no existe, MySQL lanzará un error de llave foránea
    res.status(500).json({
      success: false,
      message:
        "Error interno al crear el producto. Verifique que la categoría exista.",
      data: [],
      errors: [error.message],
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await ProductModel.update(Number(id), req.body);

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: updatedProduct,
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error interno al actualizar el producto",
      data: [],
      errors: [error.message],
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await ProductModel.delete(Number(id));

    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: `No se pudo eliminar: Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: [],
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error interno al intentar eliminar el producto`,
      data: [],
      errors: [error.message],
    });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
