import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import Todos from './Todos';

function StarredTodo() {
    const { todos, isLoading, isSuccess } = useSelector((state) => state.todo);
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

    const starredTodos = todos.filter((todo) => todo.favourite === true);

    if (isLoading) {
        <Spinner />;
    }

    return (
        <Todos
            todos={starredTodos}
            title={'Starred Tasks'}
            message={'No tasks found'}
        />
    );
}

export default StarredTodo;
