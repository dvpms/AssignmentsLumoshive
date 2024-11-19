import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { CHANGE_LANG } from "./redux/lang/actions";

const App = () => {
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">
                {lang === "EN" ? "Todo List" : "Daftar Tugas"}
              </h1>
              <TodoInput />
              <TodoList />
              <button
                className="btn btn-primary mt-4"
                onClick={() =>
                  dispatch({
                    type: CHANGE_LANG,
                    payload: lang === "EN" ? "ID" : "EN",
                  })
                }
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
