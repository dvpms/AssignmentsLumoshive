// src/components/TodoInput.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/async/todosSlice";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const {lang} = useSelector((state) =>state.lang)
  const { todo, isUpdate, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    if (todo?.id) {
      setText(todo.text);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(updateTodo({...todo, text}));
      } else {
        dispatch(
          addTodo({
            id: uuidv4(),
            text,
            completed: false,
          })
        );
      }
    }
    setText("");
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder={lang === "EN" ? "Enter a task" : "Masukkan tugas"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          className={`btn ${isUpdate ? "btn-warning" : "btn-primary"}`}
          type="submit"
          disabled={loading}
        >
          {isUpdate ? lang === "EN" ? "Update" : "Perbarui" : lang === "EN" ? "Add" : "Tambah"}
          
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
