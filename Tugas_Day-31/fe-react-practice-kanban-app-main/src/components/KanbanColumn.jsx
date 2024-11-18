import React from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ title, tasks }) => (
  <div className="flex-1">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
);

export default KanbanColumn;
