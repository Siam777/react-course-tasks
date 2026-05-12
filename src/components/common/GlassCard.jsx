const GlassCard = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`auth-container ${className}`} 
      style={{ margin: 0, width: '100%' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
