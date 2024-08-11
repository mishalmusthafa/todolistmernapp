import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { createTodo, reset } from '../features/todo/todoSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { setSelectedView } from '../features/activeView/activeViewSlice';
import BackButton from './BackButton';

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
        <main className="p-2 card-body min-h-full md:p-8">
            <h2 className="card-title text-primary">Add Tasks</h2>

            {/* Form Field */}
            <form className=" overflow-auto md:max-h-96" onSubmit={addTasks}>
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
                <div className="flex flex-wrap gap-3 justify-between items-end">
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
                {/* BackButton */}
                <div className="absolute bottom-7 left-0 md:left-7">
                    <BackButton />
                </div>

                {/* Add Button */}
                <button
                    type="submit"
                    className="btn btn-primary  text-lg absolute bottom-7 right-2 md:right-7"
                >
                    Add
                </button>
            </form>
        </main>
    );
}

export default AddTask;
