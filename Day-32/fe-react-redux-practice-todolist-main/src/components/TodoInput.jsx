import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, addTodo } from "../redux/async/todo/actions";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const TodoInput = () => {
  const [text, setText] = useState("");
  const lang = useSelector((state) => state.lang.lang);
  const { todo, isUpdate } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setText(todo.text || "");
    }
  }, [todo, isUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      dispatch(updateTodo(todo.id, text));
    } else {
      dispatch(addTodo({ id: uuidv4(), text, completed: false }));
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
              ? isUpdate
                ? "Update task..."
                : "Add a new task..."
              : isUpdate
              ? "Perbarui tugas..."
              : "Tambahkan tugas baru..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="btn btn-primary">
          {lang === "EN" ? (isUpdate ? "Update" : "Add") : isUpdate ? "Perbarui" : "Tambah"}
        </button>
      </form>
    </div>
  );
};
export default TodoInput;

