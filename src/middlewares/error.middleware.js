import { errorResponse } from "../utils/response.handler.js";

// Express sabe que es un Middleware de Error porque tiene exactamente 4 parámetros (err, req, res, next)
export const globalErrorHandler = (err, req, res, next) => {
  console.error("Error capturado globalmente:", err.message);

  // Si el error trae su propio código (ej. 404), lo usamos. Si no, asumimos que el servidor falló (500)
  const statusCode = err.statusCode || 500;

  // Mensaje amigable para el cliente
  const message = err.isOperational
    ? err.message
    : "Error interno del servidor";

  // Enviamos la respuesta usando nuestra utilidad estandarizada
  return errorResponse(res, statusCode, message, err.message);
};
