import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import todoReducer from "./todos/reducer";
import langReducer from "./lang/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  lang: langReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
