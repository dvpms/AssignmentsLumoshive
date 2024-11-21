import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
  lang: "EN",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completedTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
    updateTodo: (state, action) => {
      state.isUpdate = false;
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    currentTodo: (state, action) => {
      state.isUpdate = true;
      state.todo = action.payload;
    },
    changeLang: (state, action) => {
        state.lang = action.payload;
    }
  },
});

// untuk di component
export const { addTodo, deleteTodo, completedTodo, updateTodo, currentTodo, changeLang } =
  todosSlice.actions;

// untuk di store
export default todosSlice.reducer;
