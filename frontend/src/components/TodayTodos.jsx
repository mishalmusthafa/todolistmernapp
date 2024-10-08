import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTodos } from '../features/todo/todoSlice';
import { isToday, parseISO } from 'date-fns';
import Todos from './Todos';

function TodayTodos() {
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

    const todayTodos = todos.filter((todo) => {
        if (todo.due) {
            return isToday(parseISO(todo.due));
        }
        return false;
    });

    return (
        <Todos
            todos={todayTodos}
            title={'Todays Task'}
            message={'No tasks found for today'}
        />
    );
}

export default TodayTodos;
