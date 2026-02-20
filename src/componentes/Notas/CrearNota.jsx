import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearNota() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const guardarNota = (e) => {
    e.preventDefault();

    const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];

    const nuevaNota = {
      id: Date.now(),
      titulo,
      descripcion,
    };

    const nuevasNotas = [...notasGuardadas, nuevaNota];

    localStorage.setItem("notas", JSON.stringify(nuevasNotas));

    navigate("/notas");
  };

  return (
    <div className="container">
      <h2>➕ Crear Nota</h2>

      <form onSubmit={guardarNota}>
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

        <button type="submit">💾 Guardar</button>
      </form>
    </div>
  );
}

export default CrearNota;