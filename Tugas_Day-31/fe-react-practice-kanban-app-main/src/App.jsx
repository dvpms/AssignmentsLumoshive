import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddTaskModal from "./components/AddTaskModal";
import KanbanColumn from "./components/KanbanColumn";
import { getData, postData } from "./utils/api";

const App = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const response = await getData();
    setColumns(response.columns);
    setTasks(response.tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = () => {
    setIsAdd(!isAdd);
  };

  const handleSaveTask = async (task) => {
    try {
      const response = await postData(task);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar handleAddTask={handleAddTask} />
      {isAdd && <AddTaskModal handleAddTask={handleAddTask} handleSaveTask={handleSaveTask} />}
      <div className="p-4">
        <div className="flex space-x-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              tasks={tasks.filter((task) => task.columnId === column.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
