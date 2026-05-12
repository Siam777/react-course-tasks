import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (val) => {
    if (!val) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(val)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (val) => {
    if (!val) return 'Password is required';
    if (val.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleBlur = (field, value) => {
    let error = '';
    if (field === 'email') error = validateEmail(value);
    if (field === 'password') error = validatePassword(value);
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p className="auth-subtitle">Please enter your details to sign in</p>
      
      {serverError && <div className="error-msg">{serverError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              className={errors.email ? 'input-error' : ''}
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => handleBlur('password', e.target.value)}
              className={errors.password ? 'input-error' : ''}
              required
            />
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <button type="submit" className="auth-btn">Sign In</button>
      </form>
      
      <div className="auth-footer">
        Don't have an account? <Link to="/register">Create one</Link>
      </div>
    </div>
  );
};

export default Login;
