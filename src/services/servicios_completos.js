// =====================================================
// SERVICIOS REACT - PROYECTO INTEGRADOR SURA G8
// Plantilla para conectar Frontend con Backend
// =====================================================

// ========== 1. SERVICIO DE USUARIOS ==========
// Conecta con: ControladorUsuario.java
// Endpoint base: /apisura8/v1/usuarios

const API_URL_USUARIOS = 'http://localhost:8080/apisura8/v1/usuarios';

export const usuarioService = {
  
  // Crear nuevo usuario (POST)
  crear: async (usuario) => {
    try {
      const response = await fetch(API_URL_USUARIOS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  // Listar todos los usuarios (GET)
  listarTodos: async () => {
    try {
      const response = await fetch(API_URL_USUARIOS);
      
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodos():', error);
      throw error;
    }
  },

  // Buscar usuario por ID (GET con parámetro)
  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_USUARIOS}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró el usuario con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  }
};


// ========== 2. SERVICIO DE CURSOS ==========
// Conecta con: ControladorCurso.java
// Endpoint base: /apisura8/v1/cursos

const API_URL_CURSOS = 'http://localhost:8080/apisura8/v1/cursos';

export const cursoService = {
  
  crear: async (curso) => {
    try {
      const response = await fetch(API_URL_CURSOS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(curso)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  listarTodos: async () => {
    try {
      const response = await fetch(API_URL_CURSOS);
      
      if (!response.ok) {
        throw new Error('Error al obtener los cursos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodos():', error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_CURSOS}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró el curso con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  }
};


// ========== 3. SERVICIO DE PROFESORES ==========
// Conecta con: ControladorProfesor.java
// Endpoint base: /apisura8/v1/profesores

const API_URL_PROFESORES = 'http://localhost:8080/apisura8/v1/profesores';

export const profesorService = {
  
  crear: async (profesor) => {
    try {
      const response = await fetch(API_URL_PROFESORES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesor)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el profesor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  listarTodos: async () => {
    try {
      const response = await fetch(API_URL_PROFESORES);
      
      if (!response.ok) {
        throw new Error('Error al obtener los profesores');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodos():', error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_PROFESORES}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró el profesor con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  }
};


// ========== 4. SERVICIO DE MATRÍCULAS ==========
// Conecta con: ControladorMatricula.java
// Endpoint base: /apisurag8/v1/matriculas

const API_URL_MATRICULAS = 'http://localhost:8080/apisurag8/v1/matriculas';

export const matriculaService = {
  
  crear: async (matricula) => {
    try {
      const response = await fetch(API_URL_MATRICULAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matricula)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la matrícula');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  listarTodas: async () => {
    try {
      const response = await fetch(API_URL_MATRICULAS);
      
      if (!response.ok) {
        throw new Error('Error al obtener las matrículas');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodas():', error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_MATRICULAS}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró la matrícula con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  }
};


// ========== 5. SERVICIO DE NOTAS ==========
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

  return response.json();
};

export const notaService = {

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

  listarTodas: async () => {
    const response = await fetch(API_URL_NOTAS);
    return manejarRespuesta(response);
  },

  listarPorEmail: async (email) => {
    const response = await fetch(`${API_URL_NOTAS}?email=${email}`);
    return manejarRespuesta(response);
  },

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

  eliminar: async (id) => {
    const response = await fetch(`${API_URL_NOTAS}/${id}`, {
      method: 'DELETE'
    });

    return manejarRespuesta(response);
  }
};

// ========== 6. SERVICIO DE REPORTES ==========
// Conecta con: controladorReporte.java
// Endpoint base: /apisura8/v1/reportes

const API_URL_REPORTES = 'http://localhost:8080/apisura8/v1/reportes';

export const reporteService = {
  
  crear: async (reporte) => {
    try {
      const response = await fetch(API_URL_REPORTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporte)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el reporte');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  listarTodos: async () => {
    try {
      const response = await fetch(API_URL_REPORTES);
      
      if (!response.ok) {
        throw new Error('Error al obtener los reportes');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodos():', error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_REPORTES}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró el reporte con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  }
};


// ========== 7. SERVICIO DE ASISTENCIAS ==========
// Conecta con: AsistenciaController.java
// Endpoint base: /asistencias

const API_URL_ASISTENCIAS = 'http://localhost:8080/asistencias';

export const asistenciaService = {
  
  crear: async (asistencia) => {
    try {
      const response = await fetch(API_URL_ASISTENCIAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asistencia)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la asistencia');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  listarTodas: async () => {
    try {
      const response = await fetch(API_URL_ASISTENCIAS);
      
      if (!response.ok) {
        throw new Error('Error al obtener las asistencias');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodas():', error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_ASISTENCIAS}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró la asistencia con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  }
};


// ========== 8. SERVICIO DE NOTIFICACIONES (YA EXISTENTE) ==========
// Conecta con: ControladorNotificacion.java
// Endpoint base: /apisura8/v1/notificaciones

const API_URL_NOTIFICACIONES = 'http://localhost:8080/apisura8/v1/notificaciones';

export const notificationService = {
  
  crear: async (notificacion) => {
    try {
      const response = await fetch(API_URL_NOTIFICACIONES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificacion)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la notificación');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crear():', error);
      throw error;
    }
  },

  listarTodas: async () => {
    try {
      const response = await fetch(API_URL_NOTIFICACIONES);
      
      if (!response.ok) {
        throw new Error('Error al obtener las notificaciones');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en listarTodas():', error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL_NOTIFICACIONES}/${id}`);
      
      if (!response.ok) {
        throw new Error(`No se encontró la notificación con ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorId():', error);
      throw error;
    }
  },

  actualizar: async (notificacion) => {
    try {
      const response = await fetch(API_URL_NOTIFICACIONES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificacion)
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar la notificación');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en actualizar():', error);
      throw error;
    }
  }
};
