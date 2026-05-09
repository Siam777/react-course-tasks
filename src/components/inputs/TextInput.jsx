const TextInput = ({ label, name, value, onChange, required = false }) => {
    return (
        <div className="mb-4">
                        <label htmlFor={ name } className="block font-semibold">{label}</label>
                        <input type="text" id={name} name={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={`Enter ${label.toLowerCase()}`}
                            value={value}
                            onChange={onChange}
                            required={required}
                        />
                    </div>
    );
}

export default TextInput;