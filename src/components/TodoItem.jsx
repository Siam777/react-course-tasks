import { useState } from 'react'

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [editText, setEditText] = useState(todo.text)
  const [editType, setEditType] = useState(todo.type)
  const [isEditing, setIsEditing] = useState(false)

  const startEdit = () => {
    setEditText(todo.text)
    setEditType(todo.type)
    setIsEditing(true)
  }

  const saveEdit = () => {
    if (editText.trim() === '') return
    onEdit(todo.id, editText.trim(), editType)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditText(todo.text)
    setEditType(todo.type)
  }

  if (isEditing) {
    return (
      <li className={`todo-item editing ${todo.completed ? 'completed' : ''}`}>
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') cancelEdit()
            }}
            autoFocus
          />
          <select
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            className="todo-type-select"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </select>
          <button className="save-btn" onClick={saveEdit}>Save</button>
          <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
        </div>
      </li>
    )
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="checkmark"></span>
      </label>
      <span className="todo-text">{todo.text}</span>
      <span className={`todo-type-badge type-${todo.type}`}>{todo.type}</span>
      <div className="todo-actions">
        <button className="edit-btn" onClick={startEdit}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  )
}

export default TodoItem