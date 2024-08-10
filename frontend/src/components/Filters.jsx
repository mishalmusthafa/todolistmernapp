import React from 'react';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSidbarOpen } from '../features/sidebar/sidebarSlice';

function Filters() {
    const dispatch = useDispatch();
    const handleActiveViewClick = (view) => {
        dispatch(setSelectedView(view));
        dispatch(setSidbarOpen(false));
    };

    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const selectedView = useSelector((state) => state.activeView.selectedView);

    return (
        <>
            {/* {/* Sidebar menu and filters */}
            {isSidebarOpen && (
                <div className="h-full w-4/5">
                    <div className="card bg-base-200 w-full h-full flex items-start">
                        <nav className="card-body w-full text-lg">
                            <h2 className="card-title text-primary mb-4">
                                Filters
                            </h2>
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
                </div>
            )}
            {/* normal menu and Filters */}
            <div className="hidden md:block w-1/4 card bg-base-200 shadow-xl h-full">
                <nav className="card-body">
                    <h2 className="card-title text-primary">Filters</h2>
                    <ul className="space-y-2">
                        {['All', 'Starred', 'Today', 'Week'].map((view) => (
                            <li
                                key={view}
                                className={`text-start p-2 rounded-lg transition-colors  ease duration-300 hover:bg-white/20 cursor-pointer ${
                                    selectedView === view ? 'bg-white/20' : ''
                                }`}
                                onClick={() => handleActiveViewClick(view)}
                            >
                                {view}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Filters;
