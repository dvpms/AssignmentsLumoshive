import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, completedTodo, getTodo } from "../redux/todos/actions";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          }`}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="flex">
            <button
              className="btn btn-primary btn-sm me-3"
              onClick={() => dispatch(completedTodo(todo.id))}
            >
              {lang === "EN" ? "Completed" : "Selesai"}
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              {lang === "EN" ? "Delete" : "Hapus"}
            </button>
            <button
              className="btn btn-warning btn-sm ms-3"
              onClick={() => dispatch(getTodo(todo.id))}
            >
              {lang === "EN" ? "Update" : "Perbarui"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
