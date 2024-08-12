// Component for displaying todo items
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import TodoItem from './TodoItem';

function Todos({ todos, title, message }) {
    const { isLoading } = useSelector((state) => state.todo);

    return (
        <main className="p-2 card-body md:p-7">
            <h2 className="pt-6 card-title text-primary ">{title}</h2>
            {todos.length === 0 ? (
                <p className=" mt-4 text-center text-lg">{message}</p>
            ) : (
                <ul className="space-y-2 ">
                    {todos.map((todo) => (
                        <TodoItem todo={todo} key={todo._id} />
                    ))}
                </ul>
            )}
        </main>
    );
}

export default Todos;
