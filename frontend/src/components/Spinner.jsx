import { useEffect } from 'react';

function Spinner() {
    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="h-screen">
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/25 z-50">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </div>
    );
}

export default Spinner;
