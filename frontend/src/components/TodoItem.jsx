import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import { getSingleTodo, setCurrentTodoId } from '../features/todo/todoSlice';

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
            <div>
                <CiEdit
                    className="text-2xl z-10 transition-transform ease duration-200  hover:scale-125 cursor-pointer"
                    onClick={() => showEditTodo(todo._id, 'EditTask')}
                />
            </div>
        </div>
    );
}

export default TodoItem;
