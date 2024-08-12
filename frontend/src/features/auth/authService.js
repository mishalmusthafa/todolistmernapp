import axios from 'axios';

const API_URL = 'https://todolistmernapp-backend.onrender.com/api/users';

//Register user
const register = async (userData) => {
    console.log('Triying to register the user with userdata', userData);
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        console.log('got the response data', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
    } else {
        console.log('No response from the server');
    }
    return response.data;
};

//Login user
const login = async (userData) => {
    console.log('Triying to login with user with userdata', userData);
    console.log('This is url', API_URL);
    const response = await axios.post(API_URL + '/login', userData);

    if (response.data) {
        console.log('got the response data', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
    } else {
        console.log('No response from the server');
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    logout,
    login,
};

export default authService;
