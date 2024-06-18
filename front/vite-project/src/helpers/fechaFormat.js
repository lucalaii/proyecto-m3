export const fechaFormat = (fecha) => {
  try {
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(fecha).toLocaleDateString("es-AR", opciones);
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
  }
};
