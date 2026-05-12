import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_COIN_URL;
const CoinDetailsPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch coin details');
                }
                const data = await response.json();
                setCoin(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchCoinDetails();
    }, [id]);

    if (loading) return <div className="container"><h1>Loading...</h1></div>;
    if (error) return <div className="container"><h1>Error: {error}</h1></div>;
    if (!coin) return null;

    return (
        <div className="container coin-details-container">
            <Link to="/" className="back-link">
                <span>←</span> Back to Dashboard
            </Link>

            <div className="details-layout">
                {/* Left Sidebar: Main Info & Price */}
                <div className="details-sidebar">
                    <div className="main-info-card">
                        <img src={coin.image.large} alt={coin.name} className="large-coin-image" />
                        <div className="details-title-row">
                            <h1>{coin.name}</h1>
                            <div className="rank-badge">Rank #{coin.market_cap_rank}</div>
                        </div>
                        <div className="coin-price" style={{ fontSize: '2.5rem' }}>
                            ${coin.market_data.current_price.usd.toLocaleString()}
                        </div>
                        <div className={`price-change ${coin.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`} style={{ fontSize: '1.1rem', padding: '0.5rem 1rem' }}>
                            {coin.market_data.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}% (24h)
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-label">Market Cap</div>
                            <div className="stat-value">${coin.market_data.market_cap.usd.toLocaleString()}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">24h Volume</div>
                            <div className="stat-value">${coin.market_data.total_volume.usd.toLocaleString()}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">24h High</div>
                            <div className="stat-value" style={{ color: '#4ade80' }}>${coin.market_data.high_24h.usd.toLocaleString()}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">24h Low</div>
                            <div className="stat-value" style={{ color: '#f87171' }}>${coin.market_data.low_24h.usd.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Right Content: Description & Supply Info */}
                <div className="details-main">
                    <div className="description-section">
                        <h2>About {coin.name}</h2>
                        <div dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ').slice(0, 3).join('. ') + '.' }} />
                        
                        <h2 style={{ marginTop: '3rem' }}>Market Statistics</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-label">Circulating Supply</div>
                                <div className="stat-value">{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">Total Supply</div>
                                <div className="stat-value">{coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : '∞'} {coin.symbol.toUpperCase()}</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">All Time High</div>
                                <div className="stat-value">${coin.market_data.ath.usd.toLocaleString()}</div>
                                <div className="stat-label" style={{ fontSize: '0.75rem' }}>{new Date(coin.market_data.ath_date.usd).toLocaleDateString()}</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">All Time Low</div>
                                <div className="stat-value">${coin.market_data.atl.usd.toLocaleString()}</div>
                                <div className="stat-label" style={{ fontSize: '0.75rem' }}>{new Date(coin.market_data.atl_date.usd).toLocaleDateString()}</div>
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '2rem', fontSize: '0.85rem', opacity: 0.6 }}>
                            Last Updated: {new Date(coin.last_updated).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoinDetailsPage;