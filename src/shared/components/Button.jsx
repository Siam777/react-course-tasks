const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'auth-btn';
      case 'secondary': return 'btn-edit';
      case 'danger': return 'btn-delete';
      case 'logout': return 'logout-btn';
      case 'add': return 'btn-add';
      default: return 'auth-btn';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${getVariantClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
