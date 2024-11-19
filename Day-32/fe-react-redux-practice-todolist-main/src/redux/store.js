import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import todoReducer from "./todos/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
