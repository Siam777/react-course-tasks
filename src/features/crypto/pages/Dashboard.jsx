import { useEffect, useState, lazy, Suspense } from "react";
import { useAuth } from '../../../app/providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from "../../../shared/layouts/Header";

// Component-wise Lazy Loading
const HomePage = lazy(() => import("./HomePage"));

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => {
    const fetchCoins = async () => {
      // Map our local sortBy to Coingecko valid 'order' values
      const apiOrder = sortBy.startsWith('market_cap') ? sortBy : 'market_cap_desc';
      
      try {
        const response = await fetch(`${API_URL}&order=${apiOrder}&per_page=${limit}&page=1&sparkline=false`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, [limit, sortBy]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={handleLogout} />
      <main className="container">
        <Suspense fallback={<div>Loading Dashboard Content...</div>}>
          <HomePage
            coins={coins}
            filter={filter}
            setFilter={setFilter}
            limit={limit}
            setLimit={setLimit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            error={error} 
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
