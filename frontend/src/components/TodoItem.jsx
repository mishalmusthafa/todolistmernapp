import React from 'react';

function TodoItem({ todo }) {
    return (
        <div className="flex flex-row  justify-between items-center">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox border-2"
                />
                {todo.title}
            </div>
            <div>Edit and star</div>
        </div>
    );
}

export default TodoItem;
