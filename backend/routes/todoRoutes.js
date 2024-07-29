const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getTodo,
    postTodo,
    getTodos,
    deleteTodo,
    updateTodo,
} = require('../controller/todoController');

router.route('/').get(protect, getTodos).post(protect, postTodo);
router
    .route('/:id')
    .get(protect, getTodo)
    .delete(protect, deleteTodo)
    .put(protect, updateTodo);

module.exports = router;
