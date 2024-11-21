import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../redux/async/todosSlice";
import { deleteTodo, currentTodo } from "../redux/async/todosSlice";
import { completedTodo } from "../redux/slices/todosSlice";

const TodoList = () => {
  const { lang } = useSelector((state) => state.lang);
  const {todos, loading, error, isSuccess} = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [isSuccess]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (todos.length === 0) {
    return (
    <div className="alert alert-secondary text-center">{lang === "EN" ? "No todos found." : "Tidak ada tugas yang ditemukan."}</div>
    );
  }

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
          <div className="btn-group ">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => dispatch(completedTodo(todo.id))}
            >
              {lang === "EN" ? "Completed" : "Selesai"}
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => dispatch(currentTodo(todo))}
            >
              {lang === "EN" ? "Edit" : "Ubah"}
            </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            {lang === "EN" ? "Delete" : "Hapus"}
          </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
