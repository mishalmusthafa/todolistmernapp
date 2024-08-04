import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import {
    getSingleTodo,
    setCurrentTodoId,
    updateTodo,
} from '../features/todo/todoSlice';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';

function TodoItem({ todo }) {
    const dispatch = useDispatch();

    const showEditTodo = (id, view) => {
        dispatch(setCurrentTodoId(id));
        dispatch(setSelectedView(view));
    };

    const showSingleTodo = (id, view) => {
        dispatch(getSingleTodo(id));
        dispatch(setSelectedView(view));
    };

    const toggleFavourite = () => {
        dispatch(
            updateTodo({
                todoData: { favourite: !todo.favourite },
                id: todo._id,
            })
        );
    };

    return (
        <div className="flex flex-row  justify-between items-center">
            <div className="flex items-center gap-3">
                <input type="checkbox" className="checkbox border-2" />
                <div
                    className=" min-w-96 cursor-pointer"
                    onClick={() => showSingleTodo(todo._id, 'ShowSingleTodo')}
                >
                    {todo.title}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <CiEdit
                    className="text-2xl z-10 transition-transform ease duration-200  hover:scale-125 cursor-pointer"
                    onClick={() => showEditTodo(todo._id, 'EditTask')}
                />
                <div className="transition-transform ease duration-200 hover:scale-125">
                    {todo.favourite ? (
                        <FaStar
                            className="text-yellow-400 text-2xl cursor-pointer"
                            onClick={toggleFavourite}
                        />
                    ) : (
                        <FaRegStar
                            className="text-2xl cursor-pointer"
                            onClick={toggleFavourite}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
