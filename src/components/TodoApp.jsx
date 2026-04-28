import { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoStats from './TodoStats'
import './TodoApp.css'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [todoType, setTodoType] = useState('work')

  const addTodo = () => {
    if (input.trim() === '') return
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      type: todoType
    }
    setTodos([...todos, newTodo])
    setInput('')
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const editTodo = (id, newText, newType) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, type: newType } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      <TodoForm
        input={input}
        setInput={setInput}
        todoType={todoType}
        setTodoType={setTodoType}
        onAdd={addTodo}
      />

      <ul className="todo-list">
        <TodoList
          todos={todos}
          onToggle={toggleComplete}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </ul>

      {todos.length > 0 && <TodoStats todos={todos} />}
    </div>
  )
}

export default TodoApp