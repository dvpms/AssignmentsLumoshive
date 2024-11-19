import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodoText } from "../redux/todos/actions";
import { useSelector } from "react-redux";

const TodoInput = () => {
  const [text, setText] = useState("");
  const lang = useSelector((state) => state.lang.lang);
  const todo = useSelector((state) => state.todo.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    setText(todo.text);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      // Update todo jika sedang dalam mode edit
      dispatch(updateTodoText(todo.id, text));
    } else {
      // Tambahkan todo baru
      dispatch(addTodo({ id: Date.now(), text, completed: false }));
    }
    setText("");
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder={
            lang === "EN"
              ? todo
                ? "Update task..."
                : "Add a new task..."
              : todo
              ? "Perbarui tugas..."
              : "Tambahkan tugas baru..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="btn btn-primary">
          {lang === "EN"
            ? todo
              ? "Update"
              : "Add"
            : todo
            ? "Perbarui"
            : "Tambah"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;

