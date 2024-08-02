import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';

function Starred() {
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

    const starredTodos = todos.filter((todo) => todo.favourite === true);
    console.log(starredTodos);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="card-body">
            <h2 className="card-title text-primary">Tasks</h2>
            <ul className="space-y-2">
                {starredTodos.map((todo) => (
                    <li className="rounded-xl p-3 bg-white/20 " key={todo._id}>
                        <TodoItem todo={todo} />
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Starred;
