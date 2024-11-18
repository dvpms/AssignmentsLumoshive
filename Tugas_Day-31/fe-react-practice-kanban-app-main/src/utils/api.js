import axios from "axios";

const api_columns = "http://localhost:3000/columns";
const api_tasks = "http://localhost:3000/tasks";

// Fungsi untuk mengambil data kolom dan tugas
const getData = async () => {
  try {
    const columns = await axios.get(api_columns);
    const tasks = await axios.get(api_tasks);
    const response = {
      columns: columns.data,
      tasks: tasks.data,
    };
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Fungsi untuk menambahkan data tugas baru
const postData = async (data) => {
  try {
    const response = await axios.post(api_tasks, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Fungsi untuk memperbarui data tugas (setelah drag and drop)
const updateTaskData = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${api_tasks}/${taskId}`, updatedTask);
    return response;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export { getData, postData, updateTaskData };
