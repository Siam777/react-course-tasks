import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import InputField from '../../../shared/components/InputField';
import Button from '../../../shared/components/Button';
import GlassCard from '../../../shared/components/GlassCard';

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
    <div style={{ maxWidth: '450px', margin: '80px auto' }}>
      <GlassCard>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Please enter your details to sign in</p>
        
        {serverError && <div className="error-msg">{serverError}</div>}
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleBlur('email', e.target.value)}
            error={errors.email}
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => handleBlur('password', e.target.value)}
            error={errors.password}
            required
          />

          <Button type="submit">Sign In</Button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
