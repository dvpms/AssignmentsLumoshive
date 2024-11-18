import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

const KanbanColumn = ({ title, tasks, columnId }) => (
  <div className="flex-1">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <Droppable droppableId={columnId}>
      {/* Set columnId as droppableId */}
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-4"
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder} {/* Placeholder for drag and drop */}
        </div>
      )}
    </Droppable>
  </div>
);

export default KanbanColumn;
