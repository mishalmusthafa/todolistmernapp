import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';
import { isToday, parseISO } from 'date-fns';

function TodayTodos() {
    const { todos, isSuccess } = useSelector((state) => state.todo);
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

    const todayTodos = todos.filter((todo) => isToday(parseISO(todo.due)));

    return (
        <main className="card-body">
            <h2 className="card-title text-primary">Today's Task</h2>
            {todayTodos.length === 0 ? (
                <p className="mt-4 text-center text-lg">
                    No tasks found for today
                </p>
            ) : (
                <ul className="space-y-2">
                    {todayTodos.map((todo) => (
                        <TodoItem todo={todo} />
                    ))}
                </ul>
            )}
        </main>
    );
}

export default TodayTodos;
