import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ===== USUARIOS =====
import LoginUsuarios from './componentes/usuarios/LoginUsuarios';
import UsuarioFormulario from './componentes/usuarios/UsuarioFormulario';
import ListaUsuarios from './componentes/usuarios/ListaUsuarios';

// ===== NOTIFICACIONES =====
import FormularioNotificacion from './componentes/notificaciones/FormularioNotificacion';
import ListaNotificaciones from './componentes/notificaciones/ListaNotificaciones';
import EditarNotificacion from './componentes/notificaciones/EditarNotificacion';

// ===== NOTAS =====
import CrearNota from './componentes/Notas/CrearNota';
import EditarNota from './componentes/Notas/EditarNota';
import ListaNotas from './componentes/Notas/ListaNotas';

// ===== SHARED =====
import Navbar from './componentes/shared/Navbar';

// ===== PÁGINAS =====
import Inicio from './componentes/pages/Inicio';
import Home from './componentes/pages/Home';

// ===== ESTILOS =====
import './App.css';
import './componentes/shared/Colores.css';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginUsuarios />} />
        <Route path="/registro" element={<UsuarioFormulario />} />

        <Route path="/home" element={
          <RutaProtegida>
            <Home />
          </RutaProtegida>
        } />

        <Route path="/usuarios" element={
          <RutaProtegida>
            <ListaUsuarios />
          </RutaProtegida>
        } />

        <Route path="/notificaciones" element={
          <RutaProtegida>
            <ListaNotificaciones />
          </RutaProtegida>
        } />

        <Route path="/notificaciones/crear" element={
          <RutaSoloProfesor>
            <FormularioNotificacion />
          </RutaSoloProfesor>
        } />

        <Route path="/notificaciones/editar/:id" element={
          <RutaSoloProfesor>
            <EditarNotificacion />
          </RutaSoloProfesor>
        } />

        {/* NOTAS */}
        <Route path="/notas" element={
          <RutaProtegida>
            <ListaNotas />
          </RutaProtegida>
        } />

        <Route path="/notas/crear" element={
          <RutaSoloProfesor>
            <CrearNota />
          </RutaSoloProfesor>
        } />

        <Route path="/notas/editar/:id" element={
          <RutaSoloProfesor>
            <EditarNota />
          </RutaSoloProfesor>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;