import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { createTodo, reset } from '../features/todo/todoSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { setSelectedView } from '../features/activeView/activeViewSlice';

function AddTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.todo
    );

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due: '',
        favourite: false,
    });

    const { title, description, due, favourite } = formData;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            dispatch(reset());
        }
        dispatch(reset());
    }, [dispatch, isError, isSuccess, message, navigate]);

    const onChange = (e) => {
        setFormData((pervState) => ({
            ...pervState,
            [e.target.name]: e.target.value,
        }));
    };

    const toggleFavourite = () => {
        setFormData((prevState) => ({
            ...prevState,
            favourite: !favourite,
        }));
    };

    const addTasks = (e) => {
        e.preventDefault();
        dispatch(createTodo(formData));
        dispatch(setSelectedView('All'));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="card-body">
            <h2 className="card-title text-primary">Add Tasks</h2>
            <form className="max-h-96 overflow-auto" onSubmit={addTasks}>
                <div className="form-control">
                    <label htmlFor="title" className="label ">
                        <span className="label-text text-primary text-lg">
                            Title
                        </span>
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="title"
                        value={title}
                        onChange={onChange}
                        name="title"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="description" className="label">
                        <span className="label-text text-primary text-lg">
                            Description
                        </span>
                    </label>
                    <textarea
                        id="description"
                        className="textarea"
                        value={description}
                        onChange={onChange}
                        name="description"
                        required
                    />
                </div>
                <div className="flex gap-3 justify-between items-end">
                    <div className="form-control">
                        <label htmlFor="project" className="label">
                            <span className="label-text text-primary text-lg">
                                Project
                            </span>
                        </label>
                        <select className="select min-w-60">
                            <option>Default</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date" className="label">
                            <span className="label-text text-primary text-lg">
                                Date
                            </span>
                        </label>
                        <input
                            type="date"
                            className="input min-w-60"
                            value={due}
                            onChange={onChange}
                            name="due"
                        />
                    </div>
                    {favourite ? (
                        <FaStar
                            className="text-4xl cursor-pointer text-yellow-400"
                            onClick={toggleFavourite}
                        />
                    ) : (
                        <CiStar
                            className="text-4xl cursor-pointer"
                            onClick={toggleFavourite}
                        />
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mt-4 text-lg absolute bottom-5 right-5"
                >
                    Add
                </button>
            </form>
        </main>
    );
}

export default AddTask;
