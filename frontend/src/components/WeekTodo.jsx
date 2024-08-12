import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import { isThisWeek, parseISO } from 'date-fns';
import Todos from './Todos';

function WeekTodos() {
    const { todos, isSuccess } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     return () => {
    //         if (isSuccess) {
    //             dispatch(reset());
    //         }
    //     };
    // }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const thisWeekTodos = todos.filter((todo) =>
        isThisWeek(parseISO(todo.due))
    );

    return (
        <Todos
            todos={thisWeekTodos}
            title={`This Week's Tasks`}
            message={'No tasks found for this week'}
        />
    );
}

export default WeekTodos;
