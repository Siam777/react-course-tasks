import './TodoApp.css'

function TodoForm({ input, setInput, todoType, setTodoType, onAdd }) {
  return (
    <div className="todo-form">
      <select
        value={todoType}
        onChange={(e) => setTodoType(e.target.value)}
        className="todo-type-select"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
        <option value="health">Health</option>
      </select>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder="What needs to be done?"
      />
      <button onClick={onAdd}>Add</button>
    </div>
  )
}

export default TodoForm