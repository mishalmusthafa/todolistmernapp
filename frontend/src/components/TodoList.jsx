import TodoItem from './TodoItem';

function TodoList({ todos, title }) {
    return (
        <main className="card-body">
            <h2 className="card-title text-primary">{title}</h2>
            {todos.length > 0 ? (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            className="rounded-xl p-3 bg-white/20"
                            key={todo._id}
                        >
                            <TodoItem todo={todo} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks found.</p>
            )}
        </main>
    );
}

export default TodoList;
