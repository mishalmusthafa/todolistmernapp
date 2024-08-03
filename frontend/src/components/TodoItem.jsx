import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import { getSingleTodo } from '../features/todo/todoSlice';

function TodoItem({ todo }) {
    const dispatch = useDispatch();

    const handleActiveViewClick = (view) => {
        dispatch(setSelectedView(view))
    };

    const showSingleTodo = (id, view) => {
        dispatch(getSingleTodo(id));
        dispatch(setSelectedView(view));
    };

    return (
        <div className="flex flex-row  justify-between items-center">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    className="checkbox border-2"
                />
                <div
                    className="border-2 min-w-96 cursor-pointer"
                    onClick={() => showSingleTodo(todo._id, 'ShowSingleTodo')}
                >
                    {todo.title}
                </div>
            </div>
            <div>
                <CiEdit
                    className="text-2xl z-10 transition-transform ease duration-200  hover:scale-125 cursor-pointer"
                    onClick={() => handleActiveViewClick('EditTask')}
                />
            </div>
        </div>
    );
}

export default TodoItem;
