import { useRef, useState, useEffect } from 'react';
import Header from '../../../shared/layouts/Header';
import { useAuth } from '../../../app/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

const TimerApp = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Uncontrolled Form: Using refs instead of state
  const durationRef = useRef(null);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = (e) => {
    e.preventDefault();
    // Getting value directly from the DOM via ref (Uncontrolled)
    const value = parseInt(durationRef.current.value);
    
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid number of seconds');
      return;
    }

    setTimeLeft(value);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    if (durationRef.current) durationRef.current.value = ''; // Manually clearing the input
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={async () => { await logout(); navigate('/login'); }} />
      
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div className="auth-container" style={{ maxWidth: '500px' }}>
          <h2>⏱️ Quick Timer</h2>
          <p className="auth-subtitle">Uncontrolled Form Demonstration</p>

          <div className="timer-display" style={{ 
            fontSize: '5rem', 
            fontWeight: '800', 
            margin: '2rem 0',
            fontVariantNumeric: 'tabular-nums',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {formatTime(timeLeft)}
          </div>

          <form onSubmit={handleStart}>
            <div className="form-group">
              <label>Set Duration (Seconds)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  ref={durationRef} // Link to the ref
                  placeholder="e.g. 60"
                  defaultValue="" // Uncontrolled inputs use defaultValue
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="auth-btn" style={{ flex: 2 }}>
                {isActive ? 'Restart' : 'Start Timer'}
              </button>
              <button 
                type="button" 
                onClick={handleReset} 
                className="logout-btn" 
                style={{ flex: 1, marginTop: '1rem' }}
              >
                Reset
              </button>
            </div>
          </form>

          <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <p>💡 This form is <strong>uncontrolled</strong>. It doesn't use <code>useState</code> for the input. React only reads the value from the DOM when you click Start.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerApp;
