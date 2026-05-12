import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
            <h1 style={{ fontSize: '120px', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ marginBottom: '2rem' }}>Oops! Page Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="back-link">
                Go back to Dashboard
            </Link>
        </div>
    );
};

export default NotFoundPage;