import axios from 'axios';

const API_URL = 'https://todolistmernapp-backend.onrender.comapi/todos/';

// Create new todo
const createTodo = async (todoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, todoData, config);
    return response.data;
};

// Get todos
const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Get SingleTodo
const getSingleTodo = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + id, config);
    return response.data;
};

// Update todo
const updateTodo = async (todoData, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, todoData, config);
    return response.data;
};

// Update todo
const deleteTodo = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const todoService = {
    createTodo,
    getTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};
export default todoService;
