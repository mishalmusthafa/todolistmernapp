import axios from 'axios';

const API_URL = '/api/todos/';

// Create new todo
const createTodo = async (todoData, token) => {
    console.log('got todoData', todoData);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, todoData, config);
    console.log(response.data);
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
    console.log('getTodos data', response.data);
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
    console.log('getSingleTodo data', response.data);
    return response.data;
};

// Update todo
const updateTodo = async (todoData, id, token) => {
    console.log('got todoData', todoData, id);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, todoData, config);
    console.log(response.data);
    return response.data;
};

// Update todo
const deleteTodo = async (id, token) => {
    console.log('got todoData', id);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + id, config);
    console.log(response.data);
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
