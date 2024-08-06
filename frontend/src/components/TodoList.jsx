import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';

function Tasks() {
    const { todos, isLoading, isSuccess } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return (
        <main className="card-body">
            <h2 className="card-title text-primary">Tasks</h2>
            {todos.length === 0 ? (
                <p className="mt-4 text-center text-lg">No tasks found</p>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <TodoItem todo={todo} />
                    ))}
                </ul>
            )}
        </main>
    );
}

export default Tasks;
