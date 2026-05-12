import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    return (
        <div className="top-nav"> 
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
            </div>
            {user && (
                <div className="user-info">
                    <span>Welcome, {user.name}</span>
                    <button onClick={onLogout} className="logout-btn">Logout</button>
                </div>
            )}
        </div>
    );
};  

export default Header;