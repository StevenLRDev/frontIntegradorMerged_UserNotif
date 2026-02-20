import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarNota() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    const nota = notas.find((n) => n.id === parseInt(id));

    if (nota) {
      setTitulo(nota.titulo);
      setDescripcion(nota.descripcion);
    }
  }, [id]);

  const actualizarNota = (e) => {
    e.preventDefault();

    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const notasActualizadas = notas.map((nota) =>
      nota.id === parseInt(id)
        ? { ...nota, titulo, descripcion }
        : nota
    );

    localStorage.setItem("notas", JSON.stringify(notasActualizadas));

    navigate("/notas");
  };

  return (
    <div className="container">
      <h2>✏️ Editar Nota</h2>

      <form onSubmit={actualizarNota}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <button type="submit">💾 Actualizar</button>
      </form>
    </div>
  );
}

export default EditarNota;