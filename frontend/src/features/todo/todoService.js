import axios from 'axios';

const API_URL = '/api/todos/';

// Create new todo
const createTodo = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, ticketData, config);
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

const todoService = {
    createTodo,
    getTodos,
};
export default todoService;
