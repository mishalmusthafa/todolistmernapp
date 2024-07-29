const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Todo = require('../models/todoModel');

// @desc Get Todolist
// @route Get /api/todolists
// @access private
const getTodos = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    const todo = await Todo.find({ user: user.id });
    res.status(200).json(todo);
});

// @desc Post Todolist
// @route Post /api/todolists
// @access private
const postTodo = asyncHandler(async (req, res) => {
    const { title, description, due, completed, favourite } = req.body;
    // Validate if title and description exist
    if ((!title, !description)) {
        res.status(400);
        throw new Error('Please add the Title and description');
    }
    // Check if the user exist
    const user = req.user;
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Create user Todo
    const todo = await Todo.create({
        user: user.id,
        title,
        description,
        due,
        completed,
        favourite,
    });
    res.status(200).json(todo);
});

// @desc Get single todo
// @route Post /api/todolists/:id
// @access private
const getTodo = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error('Todo item not found');
    }
    if (todo.user.toString() !== user.id) {
        res.status(404);
        throw new Error('Not authorized');
    }
    res.status(200).json(todo);
});

// @desc Delete single todo
// @route Delete /api/todolists/:id
// @access private
const deleteTodo = asyncHandler(async (req, res) => {
    const user = req.user;

    const todo = await Todo.findById(req.params.id);
    console.log(todo);
    if (!todo) {
        res.status(404);
        throw new Error('Todo item not found');
    }
    if (todo.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }
    await todo.deleteOne();
    res.status(200).json({ success: true });
});

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error('Todo item not found');
    }
    if (todo.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTodo);
});

module.exports = {
    getTodos,
    postTodo,
    getTodo,
    deleteTodo,
    updateTodo,
};
