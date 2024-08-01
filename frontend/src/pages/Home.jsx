import React from 'react';
import Tasks from '../components/Tasks';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, createTodo, reset } from '../features/todo/todoSlice';
import { useState } from 'react';

function Home() {
    const dispatch = useDispatch();
    const [addTaskState, setAddTaskState] = useState(false);

    const addTask = (...payload) => {};

    const getAllTodos = () => {
        dispatch(getTodos());
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-5xl px-4">
                <header className="flex items-center justify-between h-32">
                    <h1 className="text-5xl">
                        to<span className="text-primary">do.</span>
                    </h1>
                </header>
                <div className="flex flex-row items-start justify-center gap-4 w-full h-full ">
                    <div className="w-1/4 card bg-base-200 shadow-xl h-full">
                        <nav className="card-body">
                            <h2 className="card-title text-primary">Filters</h2>
                            <ul className="space-y-2">
                                <li
                                    className="text-start p-2 rounded-lg  transition-colors ease duration-300 hover:bg-white/20 cursor-pointer"
                                    onClick={getAllTodos}
                                >
                                    All
                                </li>
                                <li className="text-start p-2 rounded-lg transition-colors ease duration-300  hover:bg-white/20 cursor-pointer">
                                    Starred
                                </li>
                                <li className="text-start p-2 rounded-lg transition-colors ease duration-300 hover:bg-white/20 cursor-pointer">
                                    Today
                                </li>
                                <li className="text-start p-2 rounded-lg transition-colors ease duration-300 hover:bg-white/20 cursor-pointer">
                                    Week
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="w-3/4 card bg-base-200 shadow-xl h-full">
                        <Tasks />
                    </div>
                </div>

                <button
                    onClick={addTask}
                    className="btn btn-primary mt-4 text-lg"
                >
                    Add tasks
                </button>
            </div>
        </div>
    );
}

export default Home;
