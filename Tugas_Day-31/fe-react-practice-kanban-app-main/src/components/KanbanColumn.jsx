import React from "react";
import { Droppable } from "react-beautiful-dnd"; // Import Droppable
import TaskCard from "./TaskCard"; // Import TaskCard
import PropTypes from "prop-types";

const KanbanColumn = ({ title, tasks, columnId }) => (
  <div className="flex-1">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-4"
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

KanbanColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  columnId: PropTypes.string.isRequired,
};

export default KanbanColumn;
