import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddTaskModal from "./components/AddTaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanColumn from "./components/KanbanColumn";
import { getData, postData, updateTaskData } from "./utils/api";

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
      await postData(task);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If the task is dropped outside or not moved, return early
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1); // Remove the task from original position
    movedTask.columnId = destination.droppableId; // Update task's columnId based on destination column

    updatedTasks.splice(destination.index, 0, movedTask); // Insert task into new position

    setTasks(updatedTasks); // Update state with the new tasks order

    try {
      // Update task in the API
      await updateTaskData(draggableId, movedTask); // Update task based on draggableId
      fetchData()
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <Navbar handleAddTask={handleAddTask} />
      {isAdd && (
        <AddTaskModal
          handleAddTask={handleAddTask}
          handleSaveTask={handleSaveTask}
        />
      )}

      {/* DragDropContext wrapper for drag and drop functionality */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="p-4">
          <div className="flex space-x-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                title={column.title}
                columnId={column.id} // Pass the column ID to each KanbanColumn
                tasks={tasks.filter((task) => task.columnId === column.id)} // Filter tasks based on columnId
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};


export default App;
