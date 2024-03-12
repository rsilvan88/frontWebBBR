import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa Route
import PrivateRoute from "./components/PrivateRoute";
import AuthForm from "./features/auth/AuthForm";
import { AddTarea } from "./features/tareas/AddTarea";
import { EditTarea } from "./features/tareas/EditTarea";
import { TareaList } from "./features/tareas/TareaList";
import { useSelector, useDispatch } from 'react-redux';
import { checkTokenExpiration } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <AuthForm />
          </Route>
          <PrivateRoute path="/add-tarea" isLoggedIn={isLoggedIn} component={AddTarea} />
          <PrivateRoute path="/edit-tarea" isLoggedIn={isLoggedIn} component={EditTarea} />
          <PrivateRoute path="/list-tarea" isLoggedIn={isLoggedIn} component={TareaList} />
        </Switch>
      </div>
    </Router>
  );
}
