import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getTodos, reset, setCurrentTodoId } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';
import { setSelectedView } from '../features/activeView/activeViewSlice';

function ShowSingleTodo() {
    const { todo, isLoading, isSuccess } = useSelector((state) => state.todo);
    const dispatch = useDispatch();
    const selectedView = useSelector((state) => state.activeView.selectedView);

    const showEditTodo = (id, view) => {
        dispatch(setCurrentTodoId(id));
        dispatch(setSelectedView(view));
    };

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="card-body">
            <h2 className="card-title text-primary">Task</h2>
            <h1 className="border-b-4 border-primary text-lg font-bold py-2">
                {todo.title}
            </h1>
            <p className="mt-3">{todo.description}</p>
            <div className="btn mt-4 text-lg absolute bottom-5 right-5">
                {todo.due ? (
                    <>
                        {Date.parse(todo.due) > Date.now() ? (
                            <p
                                onClick={() =>
                                    showEditTodo(todo._id, 'EditTask')
                                }
                            >
                                Due Date:{' '}
                                {new Date(todo.due).toLocaleDateString()}
                            </p>
                        ) : (
                            <p
                                className="text-red-900"
                                onClick={() =>
                                    showEditTodo(todo._id, 'EditTask')
                                }
                            >
                                Past Due{' '}
                                {new Date(todo.due).toLocaleDateString()}
                            </p>
                        )}
                    </>
                ) : (
                    <button
                        onClick={() => showEditTodo(todo._id, 'EditTask')}
                        className="btn btn-primary mt-4 text-lg absolute bottom-5 right-5"
                    >
                        Edit
                    </button>
                )}
            </div>
        </main>
    );
}

export default ShowSingleTodo;
