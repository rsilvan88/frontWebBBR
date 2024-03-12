import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';
import { Redirect } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
  };

  if (isLoggedIn) {
    return <Redirect to="/list-tarea" />;
  }

  return (
    <div className="auth-form-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading} className='login-button'>
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
