import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return <li className="empty-state">No todos yet. Add one above!</li>
  }

  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}

export default TodoList