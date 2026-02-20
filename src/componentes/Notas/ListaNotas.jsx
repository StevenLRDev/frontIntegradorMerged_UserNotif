import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListaNotas() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
    setNotas(notasGuardadas);
  }, []);

  const eliminarNota = (id) => {
    const nuevasNotas = notas.filter((nota) => nota.id !== id);
    localStorage.setItem("notas", JSON.stringify(nuevasNotas));
    setNotas(nuevasNotas);
  };

  return (
    <div className="container">
      <h2>📚 Lista de Notas</h2>

      <Link to="/notas/crear" className="btn btn-primary">
        ➕ Crear Nota
      </Link>

      <hr />

      {notas.length === 0 ? (
        <p>No hay notas registradas.</p>
      ) : (
        <ul>
          {notas.map((nota) => (
            <li key={nota.id}>
              <strong>{nota.titulo}</strong> - {nota.descripcion}
              <br />
              <Link to={`/notas/editar/${nota.id}`}>
                ✏️ Editar
              </Link>
              {" | "}
              <button onClick={() => eliminarNota(nota.id)}>
                🗑 Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaNotas;