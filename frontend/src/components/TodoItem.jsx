import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import {
    getSingleTodo,
    setCurrentTodoId,
    updateTodo,
    deleteTodo,
} from '../features/todo/todoSlice';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(todo.completed || false);

    const showEditTodo = (id, view) => {
        dispatch(setCurrentTodoId(id));
        dispatch(setSelectedView(view));
    };

    const showSingleTodo = (id, view) => {
        dispatch(getSingleTodo(id));
        dispatch(setSelectedView(view));
    };

    const onDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const toggleFavourite = () => {
        dispatch(
            updateTodo({
                todoData: { favourite: !todo.favourite },
                id: todo._id,
            })
        );
    };

    const handleCheckboxChange = () => {
        const newCompletedStatus = !completed;
        setCompleted(newCompletedStatus);
        dispatch(
            updateTodo({
                todoData: { completed: newCompletedStatus },
                id: todo._id,
            })
        );
    };

    return (
        <li
            className={`rounded-xl p-3 transition-color ease duration-300 ${
                !completed ? 'bg-white/20' : ''
            } `}
            key={todo._id}
        >
            <div className="flex flex-col lg:flex-row justify-between gap-5 border-2">
                {/* Todo task completion and task title (Flex)*/}
                <div className="flex items-center gap-3">
                    {/* Todo Task Completion checkbox*/}
                    <input
                        type="checkbox"
                        className="checkbox border-2 "
                        checked={completed}
                        onChange={handleCheckboxChange}
                    />
                    {/*  Todo task title  */}
                    <div
                        className={` text-ellipsis overflow-hidden md:w-96 cursor-pointer ${
                            completed ? 'line-through text-gray-500' : ''
                        } border-4 `}
                        onClick={() =>
                            showSingleTodo(todo._id, 'ShowSingleTodo')
                        }
                    >
                        {todo.title}
                    </div>
                </div>

                {/* Todo Tasks Actions (Flex)*/}
                <div className="flex flex-row justify-center gap-4 border-2">
                    <MdDelete
                        className="text-2xl z-10 transition-transform ease duration-200 hover:scale-125 cursor-pointer"
                        onClick={() => onDeleteTodo(todo._id)}
                    />
                    <CiEdit
                        className="text-2xl z-10 transition-transform ease duration-200 hover:scale-125 cursor-pointer"
                        onClick={() => showEditTodo(todo._id, 'EditTask')}
                    />
                    <div className="transition-transform ease duration-200 hover:scale-125 ">
                        {todo.favourite ? (
                            <FaStar
                                className="text-yellow-400 text-2xl cursor-pointer"
                                onClick={toggleFavourite}
                            />
                        ) : (
                            <FaRegStar
                                className=" text-2xl cursor-pointer"
                                onClick={toggleFavourite}
                            />
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}

export default TodoItem;
