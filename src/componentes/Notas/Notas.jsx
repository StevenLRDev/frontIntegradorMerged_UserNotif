import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { exportarNotasCSV, exportarNotasPDF } from '../../utils/exportNotas';
import '../Dashboard/dashboard.css'
import { notaService } from '../../services/notasService';
import { toast } from 'react-toastify';

const ITEMS_POR_PAGINA = 5;

function Notas() {
  const { user } = useUser();

  const [notas, setNotas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  // 🔥 ESTADOS
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ===============================
     CARGAR NOTAS DESDE BACKEND
  ================================ */
  useEffect(() => {

    const cargarNotas = async () => {
      try {
        if (!user || user.rol !== 'student') return;

        setLoading(true);
        setError(null);

        const data = await notaService.listarPorEmail(user.email);
        setNotas(data);

      } catch (error) {

        let mensaje = error.message;

        // 🔥 Traducción de errores técnicos
        if (mensaje.includes('Failed to fetch')) {
          mensaje = 'No fue posible establecer conexión con el sistema académico.';
        }

        setError(mensaje);
        toast.error(mensaje);

      } finally {
        setLoading(false);
      }
    };

    cargarNotas();

  }, [user]);

  /* ===============================
     FILTRO / BÚSQUEDA
  ================================ */
  const notasFiltradas = notas.filter((nota) => {
    const materia = nota.nombreMateria || '';
    const tipo = nota.tipoExamen || '';

    return (
      materia.toLowerCase().includes(busqueda.toLowerCase()) ||
      tipo.toLowerCase().includes(busqueda.toLowerCase())
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
      <h1 className="dashboard-title">Mis Notas</h1>

      <div className="dashboard-card dashboard-filters">
        <input
          type="text"
          placeholder="Buscar por materia o tipo de examen..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          disabled={loading}
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

      <div className="dashboard-card">
        {loading ? (
          <p>Cargando notas...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : notasFiltradas.length === 0 ? (
          <p>No tienes notas registradas.</p>
        ) : (
          <>
            <div className="table-container">
              <table className="sura-table">
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Tipo</th>
                    <th>Nota</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {notasPaginadas.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.nombreMateria}</td>
                      <td>{nota.tipoExamen}</td>
                      <td>{nota.nota}</td>
                      <td>
                        {nota.fechaExamen
                          ? new Date(nota.fechaExamen).toLocaleDateString('es-CO')
                          : ''}
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

export default Notas;