
const getAllProducts = (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      messaje: "Lista de productos",
      data: [],
      errors: [],
    });
};

const createProduct = (req, res) => {
  res
    .status(201)
    .json({
      success: true,
      messaje: "Producto creado correctamente",
      data: [],
      errors: [],
    });
};

const updateProduct = (req, res) => {
  res.status(200).json({
    success: true,
    messaje: "Producto actualizado correctamente",
    data: [],
    errors: [],
  });
};

export { getAllProducts, createProduct, updateProduct };
