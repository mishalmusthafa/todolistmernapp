import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import {  setCurrentTodoId } from '../features/todo/todoSlice';
import BackButton from './BackButton';
import { setSelectedView } from '../features/activeView/activeViewSlice';

function ShowSingleTodo() {
    const { todo, isLoading,  } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    // Use it if needed
    // useEffect(() => {
    //     return () => {
    //         if (isSuccess) {
    //             // dispatch(reset());
    //         }
    //     };
    // }, [dispatch, isSuccess]);

    const showTodo = (id, view) => {
        dispatch(setCurrentTodoId(id));
        dispatch(setSelectedView(view));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className=" p-2 card-body md:p-8">
            {/* Task title */}
            <h2 className="pt-6 card-title text-primary">Task</h2>
            <h1 className="border-b-4 border-primary text-lg font-bold py-2">
                {todo.title}
            </h1>

            {/* Task Description */}
            <p className="mt-3">{todo.description}</p>
            {/* Back Button and date*/}
            {/* Back button */}
            <div className="text-lg absolute bottom-4 left-0 md:left-7 ">
                <BackButton />
            </div>
            {/* Todo Date */}
            <div className="btn mt-4 text-lg absolute bottom-7 right-1 md:7">
                {todo.due ? (
                    <>
                        {Date.parse(todo.due) > Date.now() ? (
                            <p onClick={() => showTodo(todo._id, 'EditTask')}>
                                Due Date:{' '}
                                {new Date(todo.due).toLocaleDateString()}
                            </p>
                        ) : (
                            <p
                                className="text-red-900"
                                onClick={() => showTodo(todo._id, 'EditTask')}
                            >
                                {new Date(todo.due).toLocaleDateString()}
                            </p>
                        )}
                    </>
                ) : (
                    ''
                )}
            </div>
        </main>
    );
}

export default ShowSingleTodo;
