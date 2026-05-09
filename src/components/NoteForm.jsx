import { useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextAreaInput from "./inputs/TextAreaInput";
const NoteForm = ({ notes, setNotes }) => {
    // const [title, setTitle] = useState('');
    // const [priority, setPriority] = useState('Medium');
    // const [category, setCategory] = useState('Work');
    // const [description, setDescription] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        priority: 'Medium',
        category: 'Work',
        description: ''
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value, e.target.name);
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("formData:", formData);
        if (!formData.title.trim() || !formData.description.trim()) return;
        const newNote = {
            id: Date.now(),
            ...formData
        };
        console.log("newNote:", newNote);

        setNotes([newNote, ...notes]);
        setFormData({
            title: '',
            priority: 'Medium',
            category: 'Work',
            description: ''
        });
    };

    return (
        <>
            <button onClick={() => setIsFormVisible(!isFormVisible)} className="w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition mb-4">
                {isFormVisible ? 'Hide Form ❎' : 'Add New Note'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="mb-6">
                    <TextInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <SelectInput label="Priority" name="priority"
                        value={formData.priority} onChange={handleChange}
                        options={[
                            { value: 'Low', label: '🟢Low' },
                            { value: 'Medium', label: '🟡Medium' },
                            { value: 'High', label: '🔴High' }
                        ]
                        } />
                    <SelectInput label="Category" name="category"
                        value={formData.category} onChange={handleChange}
                        options={[
                            { value: 'Work', label: 'Work' },
                            { value: 'Personal', label: 'Personal' },
                            { value: 'Ideas', label: 'Ideas' }
                        ]} />
                    <TextAreaInput label="Description" name="description"
                        value={formData.description} onChange={handleChange} required />
                    <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-600">
                        Add Note
                    </button>
                </form>
            )}
        </>
    );
};

export default NoteForm;