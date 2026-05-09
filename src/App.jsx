import NoteForm from "./components/NoteForm";
import { useState, useEffect, use } from "react";
import NoteList from "./components/NoteList";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  const deleteNotes = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    setNotes(notes.filter(note => note.id !== id));
  };
  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes App</h2>
      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={deleteNotes} />

    </div>
  )
}

export default App;