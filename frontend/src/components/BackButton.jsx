import { useNavigate } from 'react-router-dom';

function BackButton() {
    let navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate('/')} className="btn btn-primary">
                Back
            </button>
        </>
    );
}

export default BackButton;
