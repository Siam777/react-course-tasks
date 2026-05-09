import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = ({ notes, deleteNote }) => {
    if (notes.length === 0) {
        return (
            <p className="text-center text-gray-500">No notes available. Please add some notes.</p>
        );
    }
    return (
        <div className="space-y-4">
            {notes.map((note) => (
                <Note key={note.id} note={note} deleteNote={deleteNote} />
            ))}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            priority: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NoteList;