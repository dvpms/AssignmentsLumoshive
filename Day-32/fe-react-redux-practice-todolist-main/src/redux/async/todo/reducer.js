import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  PROCESS_TODO_SUCCESS,
  GET_TODO,
  UPDATE_SUCCESS,
} from "./actions";

const initialState = {
  todos: [],
  todo: [],
  loading: false,
  error: null,
  isSuccess: false,
  isUpdate: false,
};

const todosDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        ifSuccess: false,
      };
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case FETCH_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PROCESS_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        isUpdate: false,
      };
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
        isUpdate: true,
      };
    default:
      return state;
  }
};

export default todosDataReducer;
