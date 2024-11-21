import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import todosDataReducer from "./async/todo/reducer";
import langReducer from "./lang/reducer";
import themeReducer from "./theme/reducer";

// config redux persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos"],
}

const rootReducer = combineReducers({
  todos: todosDataReducer,
  lang: langReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line no-unused-vars
const logMiddleware = store => next => action => {
  console.log("action", action);
  next(action);
};

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logMiddleware))
);

const persistor = persistStore(store);

export {store, persistor};