import React, { useEffect, useState } from 'react';
import Todos from '../components/TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, createTodo, reset } from '../features/todo/todoSlice';
import Starred from '../components/StarredTodo';
import Tasks from '../components/TodoList';
import TodayTodos from '../components/TodayTodos';
import WeekTodo from '../components/WeekTodo';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import ShowSingleTodo from '../components/ShowSingleTodo';
import Filters from '../components/Filters';
import Hamburger from '../components/Hamburger';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';

function Home() {
    const dispatch = useDispatch();
    const selectedView = useSelector((state) => state.activeView.selectedView);
    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const handleActiveViewClick = (view) => {
        dispatch(setSelectedView(view));
    };

    const handleToggleSidebar = (e) => {
        dispatch(toggleSidebar());
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
            case 'ShowSingleTodo':
                return <ShowSingleTodo />;
            default:
                return <Todos />;
        }
    };

    return (
        // Todo
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-5xl px-4">
                {/* Header */}
                <header className="flex items-center justify-between h-32 border-2">
                    <h1 className="text-5xl border-2">
                        to<span className="text-primary">do.</span>
                    </h1>
                    {/* Hamburger Icon*/}
                    <div className="md:hidden">
                        <Hamburger
                            isOpen={isSidebarOpen}
                            onClick={handleToggleSidebar}
                        />
                    </div>
                </header>

                {/* Todo Layout filters and tasks */}
                <div className="flex justify-center gap-4 w-full h-full border-2 border-red-500">
                    {/* Fileters components */}
                    <Filters />

                    {/* Tasks layout */}
                    {!isSidebarOpen && (
                        <div className="w-3/4 card bg-base-200 shadow-xl h-full border-2">
                            {/* Rendering Tasks based on Filters */}
                            {renderContent()}

                            {/* Buttons (AddTask) */}
                            {selectedView !== 'AddTask' &&
                            selectedView !== 'EditTask' &&
                            selectedView !== 'ShowSingleTodo' ? (
                                <button
                                    onClick={() =>
                                        handleActiveViewClick('AddTask')
                                    }
                                    className="btn btn-primary mt-4 text-lg absolute bottom-5 right-5"
                                >
                                    Add tasks
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
