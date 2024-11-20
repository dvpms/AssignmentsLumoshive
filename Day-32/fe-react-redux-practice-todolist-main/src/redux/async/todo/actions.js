import axios from "axios";

const FETCH_TODO_FAILURE = "FETCH_TODO_FAILURE";
const FETCH_TODO_REQUEST = "FETCH_TODO_REQUEST";
const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
const PROCESS_TODO_SUCCESS = "PROCESS_TODO_SUCCESS";
const GET_TODO = "GET_TODO";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";

const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODO_REQUEST });
    try {
      const response = await axios.get("http://localhost:3000/todos");
      const data = await response.data;
      console.log(data);
      dispatch({ type: FETCH_TODO_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_TODO_FAILURE, payload: error.message });
    }
  };
};

const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODO_REQUEST });
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      dispatch({ type: PROCESS_TODO_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODO_FAILURE, payload: error.message });
    }
  };
};
const addTodo = (data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODO_REQUEST });
    try {
      await axios.post(`http://localhost:3000/todos/`, data);
      dispatch({ type: PROCESS_TODO_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODO_FAILURE, payload: error.message });
    }
  };
};

const getTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODO_REQUEST });
    const response = await axios.get(`http://localhost:3000/todos/${id}`);
    const data = await response.data;
    dispatch({ type: PROCESS_TODO_SUCCESS });
    dispatch({ type: GET_TODO, payload: data });
  };
};

const updateTodo = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODO_REQUEST });
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, { text: data });
      dispatch({ type: UPDATE_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODO_FAILURE, payload: error.message });
    }
  };
};

export {
  FETCH_TODO_FAILURE,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  PROCESS_TODO_SUCCESS,
  GET_TODO,
  UPDATE_SUCCESS,
  getTodo,
  fetchTodos,
  deleteTodo,
  addTodo,
  updateTodo,
};
