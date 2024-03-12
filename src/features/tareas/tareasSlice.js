import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://pruebabbr.azurewebsites.net/api/v1/tareas/";

export const fetchTareas = createAsyncThunk("tareas/fetchTareas", async () => {
  const response = await fetch(`${backendUrl}`,{
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getTokenFromLocalStorage()}`
    }
  });
  const tareas = await response.json();
  return tareas;
});

export const postTarea = createAsyncThunk("tareas/postTarea", async (tarea, { dispatch }) => {
  const response = await fetch(`${backendUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getTokenFromLocalStorage()}`
    },
    body: JSON.stringify(tarea),
  });
  await response.json();
  dispatch(fetchTareas());
});

export const updateTarea = createAsyncThunk("tareas/updateTarea", async (tarea, { dispatch }) => {
  const response = await fetch(`${backendUrl}${tarea.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getTokenFromLocalStorage()}`
    },
    body: JSON.stringify(tarea),
  });
  await response.json();
  dispatch(fetchTareas());
});

export const deleteTarea = createAsyncThunk("tareas/deleteTarea", async (id, { dispatch }) => {
  await fetch(`${backendUrl}${id.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getTokenFromLocalStorage()}`
    }
  });
  dispatch(fetchTareas());
});

const tareasSlice = createSlice({
  name: "tareas",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    tareaUpdated(state, action) {
      const { id, descripcion, fechaModificacion, vigente } = action.payload;
      const existingTarea = state.entities.find((tarea) => tarea.id === id);
      if (existingTarea) {
        existingTarea.descripcion = descripcion;
        existingTarea.fechaModificacion = fechaModificacion;
        existingTarea.vigente = vigente;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTareas.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTareas.fulfilled, (state, action) => {
        state.entities = [];
        state.loading = false;
        state.entities = [...state.entities, ...action.payload];
      })
      .addCase(fetchTareas.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(postTarea.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postTarea.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postTarea.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTarea.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTarea.rejected, (state, action) => {
        state.loading = false;
      }).addCase(updateTarea.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTarea.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTarea.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { tareaUpdated } = tareasSlice.actions;

export default tareasSlice.reducer;
