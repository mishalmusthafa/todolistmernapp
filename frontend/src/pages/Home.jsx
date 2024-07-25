import React from 'react';

function Home() {
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
                                <li className="text-start p-2 rounded-lg  transition-colors ease duration-300 hover:bg-white/20 cursor-pointer">
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
                        <main className="card-body">
                            <h2 className="card-title text-primary">Tasks</h2>
                            <ul className="space-y-2">
                                <li className="rounded-xl p-3 bg-white/20 text-white">
                                    Task1
                                </li>
                            </ul>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
