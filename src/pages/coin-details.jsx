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
                console.log('Fetched coin details:', data);
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

    return (
        <div className="coin-details-container">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1 className='coin-details-title'>{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !error && coin && (
                <>
                    <div className="coin-details-card">
                        <img src={coin.image.large} alt={coin.name} className="coin-details-image" />
                    </div>
                    <p>{coin.description.en.split('. ')[0] + '.'}</p>
                    <div className="coin-details-info">
                        <h3>Rank: #{coin.market_cap_rank}</h3>
                        <h3>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
                        <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                        <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
                        <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
                        <h4>24h Price Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</h4>
                        <h4> Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</h4>
                        <h4>Total Supply: {coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : 'N/A'}</h4>
                        <h4> All Time High: ${coin.market_data.ath.usd.toLocaleString()}</h4>
                        <h4> All Time Low: ${coin.market_data.atl.usd.toLocaleString()}</h4>
                        <h4> Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
                    </div>
                </>
            )}
        </div>
    );
};
export default CoinDetailsPage;