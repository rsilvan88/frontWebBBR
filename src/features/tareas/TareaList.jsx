import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchTareas, deleteTarea } from "./tareasSlice";
import { logout } from '../../features/auth/authSlice';

import './Tareas.css';

export function TareaList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.tareas);
  const loading = useSelector((state) => state.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  useEffect(() => {
    dispatch(fetchTareas());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTarea({ id }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD - Lista de Tareas</h1>
      </div>
      <div className="button-head">
        <Link to="/add-tarea">
          <button className="button-primary">Agregar Tarea</button>
        </Link>

        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarea</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th>Activo?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entities.map(({ id, descripcion, fechaCreacion, fechaModificacion, vigente}, i) => (
                  <tr key={i}>
                    <td className="td-custom">{id}</td>
                    <td className="td-custom">{descripcion}</td>
                    <td className="td-custom">{fechaCreacion}</td>
                    <td className="td-custom">{fechaModificacion}</td>
                    <td className="td-custom"><input aria-disabled="true" type="checkbox" checked={vigente} disabled="disabled"/></td>
                    <td className="td-custom">
                      <Link to={`/edit-tarea/${id}`}>
                        <button className="button-primary">Editar</button>
                      </Link>
                      <button onClick={() => handleDelete(id)} className="button-primary">Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}