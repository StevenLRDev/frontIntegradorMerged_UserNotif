// ====================================
// APP.JSX - SISTEMA DE ROLES DEFINITIVO
//
// PROFESORES:  pueden VER, CREAR y EDITAR notificaciones
// ESTUDIANTES: solo pueden VER notificaciones (solo lectura)
// ====================================

// ====================================
// APP.JSX - UNIFICADO
// Incluye rutas actuales + placeholder para futuros módulos
// Profesores / Notas / Matrícula / Reportes
// ====================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ===== USUARIOS =====
import LoginUsuarios from './componentes/usuarios/LoginUsuarios';
import UsuarioFormulario from './componentes/usuarios/UsuarioFormulario';
import ListaUsuarios from './componentes/usuarios/ListaUsuarios';

// ===== NOTIFICACIONES =====
import FormularioNotificacion from './componentes/notificaciones/FormularioNotificacion';
import ListaNotificaciones from './componentes/notificaciones/ListaNotificaciones';
import EditarNotificacion from './componentes/notificaciones/EditarNotificacion';

// ===== SHARED =====
import Navbar from './componentes/shared/Navbar';

// ===== PÁGINAS =====
import Inicio from './componentes/pages/Inicio';
import Home from './componentes/pages/Home';


//========== REPORTES ESTADÍSTICOS ========
import ReportesEstadisticos from './componentes/reportes/ReportesEstadisticos'
/*
  PRÓXIMOS MÓDULOS — descomenta cuando estén listos:

  import ListaProfesores from './componentes/profesores/ListaProfesores';
  import FormularioProfesor from './componentes/profesores/FormularioProfesor';

  import ListaNotas from './componentes/notas/ListaNotas';
  import FormularioNota from './componentes/notas/FormularioNota';

  import ListaMatricula from './componentes/matricula/ListaMatricula';
  import FormularioMatricula from './componentes/matricula/FormularioMatricula';

  ;
*/

// ===== ESTILOS GLOBALES =====
import './App.css';
import './componentes/shared/Colores.css';

// ====================================
// GUARDS DE RUTA
// ====================================

/** Cualquier usuario autenticado */
function RutaProtegida({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

/** Solo rol Profesor */
function RutaSoloProfesor({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== 'Profesor') return <Navigate to="/home" replace />;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

// ====================================
// COMPONENTE PRINCIPAL
// ====================================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginUsuarios />} />
        <Route path="/registro" element={<UsuarioFormulario />} />

        {/* ===== HOME ===== */}
        <Route path="/home" element={<RutaProtegida><Home /></RutaProtegida>} />

        {/* ===== MÓDULO: USUARIOS ===== */}
        <Route path="/usuarios" element={<RutaProtegida><ListaUsuarios /></RutaProtegida>} />

        {/* ===== MÓDULO: NOTIFICACIONES ===== */}
        <Route path="/notificaciones" element={<RutaProtegida><ListaNotificaciones /></RutaProtegida>} />
        <Route path="/notificaciones/crear" element={<RutaSoloProfesor><FormularioNotificacion /></RutaSoloProfesor>} />
        <Route path="/notificaciones/editar/:id" element={<RutaSoloProfesor><EditarNotificacion /></RutaSoloProfesor>} />

        {/* ===== MÓDULO: PROFESORES (próximo) ===== */}
        {/*
        <Route path="/profesores" element={<RutaProtegida><ListaProfesores /></RutaProtegida>} />
        <Route path="/profesores/crear" element={<RutaSoloProfesor><FormularioProfesor /></RutaSoloProfesor>} />
        <Route path="/profesores/editar/:id" element={<RutaSoloProfesor><FormularioProfesor /></RutaSoloProfesor>} />
        */}

        {/* ===== MÓDULO: NOTAS (próximo) ===== */}
        {/*
        <Route path="/notas" element={<RutaProtegida><ListaNotas /></RutaProtegida>} />
        <Route path="/notas/crear" element={<RutaSoloProfesor><FormularioNota /></RutaSoloProfesor>} />
        <Route path="/notas/editar/:id" element={<RutaSoloProfesor><FormularioNota /></RutaSoloProfesor>} />
        */}

        {/* ===== MÓDULO: MATRÍCULA (próximo) ===== */}
        {/*
        <Route path="/matricula" element={<RutaProtegida><ListaMatricula /></RutaProtegida>} />
        <Route path="/matricula/crear" element={<RutaSoloProfesor><FormularioMatricula /></RutaSoloProfesor>} />
        <Route path="/matricula/editar/:id" element={<RutaSoloProfesor><FormularioMatricula /></RutaSoloProfesor>} />
        */}

        {/* ===== MÓDULO: REPORTES (próximo - solo profesores) ===== */}
        {
        <Route path="/reportes" element={<RutaSoloProfesor><ReportesEstadisticos /></RutaSoloProfesor>} />
        }

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
