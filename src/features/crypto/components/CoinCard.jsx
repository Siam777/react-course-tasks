import { Link } from "react-router-dom";

const CoinCard = ({ coin }) => {
    return (
        <Link to={`/coin/${coin.id}`}>
            <div className="coin-card">
                <div className="coin-header">
                    <img src={coin.image} alt={coin.name} className="coin-image" />
                    <div>
                        <h2>{coin.name}</h2>
                        <p className="symbol">{coin.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <div className="coin-price">${coin.current_price.toLocaleString()}</div>
                <div className={`price-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                    {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h)?.toFixed(2)}%
                </div>
                <div className="market-cap">
                    Market Cap: <span>${coin.market_cap.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    );
};
export default CoinCard