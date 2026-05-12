import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';

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
    <div style={{ maxWidth: '450px', margin: '80px auto' }}>
      <GlassCard>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us to start tracking your crypto portfolio</p>
        
        {serverError && <div className="error-msg">{serverError}</div>}
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            required
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            required
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit">Create Account</Button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
