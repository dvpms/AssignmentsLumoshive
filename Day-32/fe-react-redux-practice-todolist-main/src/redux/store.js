import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import todoReducer from "./todos/reducer";
import langReducer from "./lang/reducer";
import themeReducer from "./theme/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  lang: langReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
