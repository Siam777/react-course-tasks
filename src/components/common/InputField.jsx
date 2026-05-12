const InputField = ({ 
  label, 
  error, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  name, 
  register, 
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {register ? (
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            {...props}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputField;
