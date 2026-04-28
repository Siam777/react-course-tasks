function TodoStats({ todos }) {
  const completed = todos.filter(t => t.completed).length
  return (
    <div className="todo-stats">
      {completed} of {todos.length} completed
    </div>
  )
}

export default TodoStats