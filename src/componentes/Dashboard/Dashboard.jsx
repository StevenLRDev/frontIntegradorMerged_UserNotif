import { useEffect, useState } from 'react';
import CrearNota from '../Notas/CrearNota';
import { toast } from 'react-toastify';
import { exportarNotasCSV, exportarNotasPDF } from '../../utils/exportNotas';
import { notaService } from '../../services/notasService';
import './dashboard.css';

const ITEMS_POR_PAGINA = 5;

function Dashboard() {
  const [notas, setNotas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [notaEditando, setNotaEditando] = useState(null);

  // 🔥 NUEVOS ESTADOS
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ===============================
     CARGAR NOTAS DESDE BACKEND
  ================================ */
  const cargarNotas = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await notaService.listarTodas();
      setNotas(data);

    } catch (error) {

      const mensaje =
        error.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.'
          : error.message;

      setError(mensaje);
      toast.error(mensaje);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    cargarNotas();
  }, []);

  /* ===============================
     CREAR / EDITAR NOTA
  ================================ */
  const guardarNota = async (nota) => {
    try {
      setLoading(true);

      if (notaEditando) {
        await notaService.actualizar(notaEditando.id, nota);
        toast.success('Nota actualizada');
      } else {
        await notaService.crear(nota);
        toast.success('Nota creada');
      }

      setNotaEditando(null);
      await cargarNotas();

    } catch (error) {

      const mensaje =
        error.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.'
          : error.message;

      toast.error(mensaje);

    } finally {
      setLoading(false);
    }
  };



  /* ===============================
     ELIMINAR NOTA
  ================================ */
  const eliminarNota = async (id) => {
    if (!window.confirm('¿Eliminar esta nota?')) return;

    try {
      setLoading(true);
      await notaService.eliminar(id);
      toast.success('Nota eliminada');
      await cargarNotas();

    } catch (error) {

      const mensaje =
        error.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.'
          : error.message;

      toast.error(mensaje);

    } finally {
      setLoading(false);
    }
  };


  /* ===============================
     FILTRO
  ================================ */
  const notasFiltradas = notas.filter((nota) => {
    const estudiante = nota.nombreEstudiante || '';
    const materia = nota.nombreMateria || '';

    return (
      estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
      materia.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  /* ===============================
     PAGINACIÓN
  ================================ */
  const totalPaginas = Math.ceil(
    notasFiltradas.length / ITEMS_POR_PAGINA
  );

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const notasPaginadas = notasFiltradas.slice(inicio, fin);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  /* ===============================
     EXPORTACIÓN
  ================================ */
  const exportarCSV = () => {
    exportarNotasCSV(notasFiltradas);
  };

  const exportarPDF = () => {
    exportarNotasPDF(notasFiltradas);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard del Docente</h1>

      {/* FORMULARIO */}
      <div className="dashboard-card">
        <CrearNota
          onGuardar={guardarNota}
          notaEditando={notaEditando}
          cancelarEdicion={() => setNotaEditando(null)}
        />
      </div>

      {/* FILTROS + EXPORTACIÓN */}
      <div className="dashboard-card dashboard-filters">
        <input
          type="text"
          placeholder="Buscar por estudiante o materia..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="export-actions">
          <button
            className="btn btn-outline"
            onClick={exportarCSV}
            disabled={loading}
          >
            Exportar CSV
          </button>

          <button
            className="btn btn-outline"
            onClick={exportarPDF}
            disabled={loading}
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="dashboard-card">
        {loading ? (
          <p>Cargando notas...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : notasFiltradas.length === 0 ? (
          <p>No hay notas registradas.</p>
        ) : (
          <>
            <div className="table-container">
              <table className="sura-table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Materia</th>
                    <th>Tipo</th>
                    <th>Nota</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {notasPaginadas.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.nombreEstudiante}</td>
                      <td>{nota.nombreMateria}</td>
                      <td>{nota.tipoExamen}</td>
                      <td>{nota.nota}</td>
                      <td>
                        {new Date(nota.fechaExamen).toLocaleDateString('es-CO')}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline"
                          onClick={() => setNotaEditando(nota)}
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() => eliminarNota(nota.id)}
                          disabled={loading}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPaginas > 1 && (
              <div className="pagination">
                {Array.from(
                  { length: totalPaginas },
                  (_, i) => i + 1
                ).map((num) => (
                  <button
                    key={num}
                    className={num === paginaActual ? 'active' : ''}
                    onClick={() => setPaginaActual(num)}
                    disabled={loading}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;