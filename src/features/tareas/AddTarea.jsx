import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { postTarea } from "./tareasSlice";

export function AddTarea() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [descripcion, setDescripcion] = useState("");
  const [fechaModificacion] = "";

  const [error, setError] = useState(null);

  const [vigente, setVigente] = useState(true);

  const handleDescripcion = (e) => setDescripcion(e.target.value);
  const handleCheckboxChange = () => {
    setVigente(!vigente);
  };

  const handleClick = () => {
    if (descripcion) {
      dispatch(
        postTarea({
            descripcion,
            fechaCreacion: new Date().toISOString(),
            fechaModificacion,
            vigente
        })
      );
      setError(null);
      history.push('/list-tarea');
    } else {
      setError("Por favor ingrese los datos");
    }

    setDescripcion("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Nueva Tarea</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Descripción:</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Detalle de la tarea."
            id="nameInput"
            onChange={handleDescripcion}
            value={descripcion}
          />
          <label htmlFor="vigenteInput">Tarea vigente?:</label>
          <input
                    type="checkbox"
                    checked={vigente}
        onChange={handleCheckboxChange}
      />
          {error && error}
          <br/>
          <br/>
          <button onClick={handleClick} className="button-primary">
            Agregar Tarea
          </button>
        </div>
      </div>
    </div>
  );
}