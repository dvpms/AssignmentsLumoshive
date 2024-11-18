import axios from "axios";

const api_columns = "http://localhost:3000/columns"
const api_tasks = "http://localhost:3000/tasks"

const getData = async () => {
    try {
        const columns = await axios.get(api_columns);
        const tasks = await axios.get(api_tasks);
        const response = {
            columns: columns.data,
            tasks: tasks.data
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};

const postData = async (data) => {
    try {
        const response = await axios.post(api_tasks, data);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export { getData, postData };