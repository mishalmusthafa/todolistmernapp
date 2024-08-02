import React from 'react';
import { CiEdit } from 'react-icons/ci';

function TodoItem({ todo }) {
    const editTask = () => {};
    return (
        <div className="flex flex-row  justify-between items-center">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    // defaultUnChecked
                    className="checkbox border-2"
                />
                {todo.title}
            </div>
            <div>
                <CiEdit
                    className="text-2xl transition-transform ease duration-200  hover:scale-125 cursor-pointer"
                    onClick={editTask}
                />
            </div>
        </div>
    );
}

export default TodoItem;
