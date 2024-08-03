import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';

function ShowSingleTodo() {
    const { todo, isLoading, isSuccess } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

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
        </main>
    );
}

export default ShowSingleTodo;
