const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETED_TODO = "COMPLETED_TODO";

const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
const completedTodo = (id) => ({ type: COMPLETED_TODO, payload: id });
export {
  ADD_TODO,
  DELETE_TODO,
  COMPLETED_TODO,
  addTodo,
  deleteTodo,
  completedTodo,
};
