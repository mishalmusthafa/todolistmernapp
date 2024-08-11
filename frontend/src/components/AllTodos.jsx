import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTodos, reset } from '../features/todo/todoSlice';
import Todos from './Todos';

function AllTodos() {
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

    return <Todos todos={todos} title={'Tasks'} message={'No task found'} />;
}

export default AllTodos;
