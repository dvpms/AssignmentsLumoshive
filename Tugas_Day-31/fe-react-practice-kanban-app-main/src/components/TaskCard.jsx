import React from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

const TaskCard = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <div
        className="card bg-white shadow-md"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="card-body">
          <h2 className="card-title">{task.title}</h2>
          <p>{task.description}</p>
          <div className="badge badge-outline">{task.tag}</div>
          <div className="text-sm text-gray-500 mt-2">
            {task.startDate} - {task.endDate}
          </div>
        </div>
      </div>
    )}
  </Draggable>
);

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default TaskCard;
