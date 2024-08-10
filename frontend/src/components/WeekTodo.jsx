import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';
import { isThisWeek, parseISO } from 'date-fns';

function WeekTodos() {
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

    const thisWeekTodos = todos.filter((todo) =>
        isThisWeek(parseISO(todo.due))
    );

    return (
        <main className="card-body">
            <h2 className="card-title text-primary">This Week's Tasks</h2>
            {thisWeekTodos.length === 0 ? (
                <p className="mt-4 text-center text-lg">
                    No tasks found for this week
                </p>
            ) : (
                <ul className="space-y-2">
                    {thisWeekTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </main>
    );
}

export default WeekTodos;
