import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const currentTodo = createAsyncThunk("todos/currentTodo", async (todo) => {
  const response = await axios.get(`${API_URL}/${todo.id}`);
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
    
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
});

const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
  loading: false,
  error: null,
  isSuccess: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch todos";
      });

    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add todo";
      });

    builder
      .addCase(currentTodo.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(currentTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = action.payload;
        state.isUpdate = true;
      })
      .addCase(currentTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch todo";
      });

    builder
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update todo";
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete todo";
      });
  },
});

export default todosSlice.reducer;
