// ========== SERVICIO DE NOTAS ==========
// Conecta con: ControladorNota.java
// Endpoint base: /apisura8/v1/notas

const API_URL_NOTAS = 'http://localhost:8080/apisura8/v1/notas';

// ===============================
// FUNCIÓN GLOBAL PARA MANEJAR RESPUESTAS
// ===============================
const manejarRespuesta = async (response) => {
  if (!response.ok) {
    const mensaje = await response.text();
    throw new Error(mensaje || 'Error en la petición');
  }

  // Si el backend devuelve vacío (ej: DELETE)
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const notaService = {

  // ===============================
  // CREAR NOTA
  // ===============================
  crear: async (nota) => {
    const response = await fetch(API_URL_NOTAS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nota)
    });

    return manejarRespuesta(response);
  },

  // ===============================
  // LISTAR TODAS
  // ===============================
  listarTodas: async () => {
    const response = await fetch(API_URL_NOTAS);
    return manejarRespuesta(response);
  },

  // ===============================
  // LISTAR POR EMAIL
  // ===============================
  listarPorEmail: async (email) => {
    const response = await fetch(`${API_URL_NOTAS}?email=${email}`);
    return manejarRespuesta(response);
  },

  // ===============================
  // ACTUALIZAR
  // ===============================
  actualizar: async (id, nota) => {
    const response = await fetch(`${API_URL_NOTAS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nota)
    });

    return manejarRespuesta(response);
  },

  // ===============================
  // ELIMINAR
  // ===============================
  eliminar: async (id) => {
    const response = await fetch(`${API_URL_NOTAS}/${id}`, {
      method: 'DELETE'
    });

    return manejarRespuesta(response);
  }
};