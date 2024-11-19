const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETED_TODO = "COMPLETED_TODO";
const UPDATE_TODO_TEXT = "UPDATE_TODO_TEXT";
const GET_TODO = "GET_TODO";

const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
const completedTodo = (id) => ({ type: COMPLETED_TODO, payload: id });
const getTodo = (id) => ({ type: GET_TODO, payload: id });
const updateTodoText = (id, text) => ({
  type: UPDATE_TODO_TEXT,
  payload: { id, text },
});

export {
  ADD_TODO,
  DELETE_TODO,
  COMPLETED_TODO,
  UPDATE_TODO_TEXT,
  GET_TODO,
  addTodo,
  deleteTodo,
  completedTodo,
  updateTodoText,
  getTodo
};
