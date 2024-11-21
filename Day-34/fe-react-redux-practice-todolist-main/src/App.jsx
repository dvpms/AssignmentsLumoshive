import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { changeLang } from "./redux/slices/todosSlice";
import {useSelector, useDispatch} from "react-redux";

const App = () => {
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">{lang === "EN" ? "Todo List" : "Daftar Tugas"}</h1>
              <TodoInput />
              <TodoList />
              <button
                className="btn btn-primary btn-sm mt-3"
                onClick={() => dispatch(changeLang(lang === "EN" ? "ID" : "EN"))}
              >
                {lang === "EN" ? "EN" : "ID"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
