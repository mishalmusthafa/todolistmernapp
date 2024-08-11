import { setSelectedView } from '../features/activeView/activeViewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';

function BackButton() {
    const dispatch = useDispatch();
    const { lastSelectedView } = useSelector((state) => state.activeView);

    const handleBackButton = () => {
        dispatch(setSelectedView(lastSelectedView));
    };

    return (
        <>
            <button
                onClick={handleBackButton}
                className="btn btn-ghost text-5xl"
            >
                <IoIosArrowBack />
            </button>
        </>
    );
}

export default BackButton;
