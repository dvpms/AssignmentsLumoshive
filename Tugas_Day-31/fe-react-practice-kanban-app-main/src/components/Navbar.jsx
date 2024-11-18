import React from "react";
import PropTypes from "prop-types";

const Navbar = ({handleAddTask}) => (
  <div className="navbar bg-base-100 shadow-lg">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">Kanban App</a>
    </div>
    <div className="flex-none">
      <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
    </div>
  </div>
);

Navbar.propTypes = {
  handleAddTask: PropTypes.func.isRequired,
};

export default Navbar;
