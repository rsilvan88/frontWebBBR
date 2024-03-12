import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import React, { useState } from "react";
import { updateTarea } from "./tareasSlice";

export function EditTarea() {
  const { pathname } = useLocation();
  const tareaId = parseInt(pathname.replace("/edit-tarea/", ""));

  const tarea = useSelector((state) =>
    state.tareas.entities.find((tarea) => tarea.id === tareaId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [vigente, setVigente] = useState(true);

  const [error, setError] = useState(null);
  const handleCheckboxChange = (event) => {
    setVigente(event.target.checked);
  };

  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const handleDescripcion = (e) => setDescripcion(e.target.value);

  const handleClick = () => {
    if (descripcion) {
      dispatch(
        updateTarea({
          id: tareaId,
          descripcion,
          fechaModificacion: new Date().toISOString(),
          vigente,
        })
      );

      setError(null);
      history.push('/list-tarea');
    } else {
      setError("Por favor ingrese los datos");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Editar Tarea</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="tareaInput">Descripcion:</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Detalle de la tarea."
            id="tareaInput"
            onChange={handleDescripcion}
            value={descripcion}
          />
          <label htmlFor="emailInput">Tarea vigente?:</label>
          <input
                    type="checkbox"
                    checked={vigente}
                    onChange={handleCheckboxChange}
                />
          {error && error}
          <br/>
          <br/>
          <button onClick={handleClick} className="button-primary">
            Actualizar Tarea
          </button>
        </div>
      </div>
    </div>
  );
}