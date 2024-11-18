import React, { useState } from "react";

const AddTaskModal = ({ handleAddTask, handleSaveTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    tag: "",
    columnId: "todo",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask();
    handleSaveTask(newTask);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Title</label>
            <input
              type="text"
              className="input input-bordered"
              name="title"
              value={newTask.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered"
              name="description"
              value={newTask.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">Start Date</label>
            <input
              type="date"
              className="input input-bordered"
              name="startDate"
              value={newTask.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">End Date</label>
            <input
              type="date"
              className="input input-bordered"
              name="endDate"
              value={newTask.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">Tag</label>
            <select
              className="select select-bordered"
              name="tag"
              value={newTask.tag}
              onChange={handleChange}
            >
              <option>Development</option>
              <option>Testing</option>
              <option>Design</option>
            </select>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleAddTask}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddTaskModal;

