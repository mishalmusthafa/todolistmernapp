import React from 'react';
import Todos from '../components/TodosItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, createTodo, reset } from '../features/todo/todoSlice';
import { useState } from 'react';
import Starred from '../components/Starred';
import Tasks from '../components/TodosItem';
import TodayTodos from '../components/TodayTodos';
import WeekTodo from '../components/WeekTodo';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import ShowTask from '../components/ShowTask';
import { setSelectedView } from '../features/activeView/activeViewSlice';

function Home() {
    const dispatch = useDispatch();
    const [addTaskState, setAddTaskState] = useState(false);
    const selectedView = useSelector((state) => state.activeView.selectedView);

    const handleActiveViewClick = (view) => {
        dispatch(setSelectedView(view));
    };

    const renderContent = () => {
        switch (selectedView) {
            case 'All':
                return <Todos />;
            case 'Starred':
                return <Starred />;
            case 'Today':
                return <TodayTodos />;
            case 'Week':
                return <WeekTodo />;
            case 'AddTask':
                return <AddTask />;
            case 'EditTask':
                return <EditTask />;
            case 'ShowTask':
                return <ShowTask />;
            default:
                return <Todos />;
        }
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
                                {['All', 'Starred', 'Today', 'Week'].map(
                                    (view) => (
                                        <li
                                            key={view}
                                            className={`text-start p-2 rounded-lg transition-colors ease duration-300 hover:bg-white/20 cursor-pointer ${
                                                selectedView === view
                                                    ? 'bg-white/20'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                handleActiveViewClick(view)
                                            }
                                        >
                                            {view}
                                        </li>
                                    )
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div className="w-3/4 card bg-base-200 shadow-xl h-full">
                        {renderContent()}
                        {selectedView !== 'AddTask' ? (
                            <button
                                onClick={() => handleActiveViewClick('AddTask')}
                                className="btn btn-primary mt-4 text-lg absolute bottom-5 right-5"
                            >
                                Add tasks
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
