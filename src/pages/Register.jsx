import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        return value ? '' : 'Full name is required';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change for better experience
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validate(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <p className="auth-subtitle">Join us to start tracking your crypto portfolio</p>
      
      {serverError && <div className="error-msg">{serverError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="auth-btn">Create Account</button>
      </form>
      
      <div className="auth-footer">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default Register;
