const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div className="mb-4">
            <label htmlFor="{name}" className="block font-semibold">{label}</label>
            <select id={name} name={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;