import { useState } from "react";
import CoinCard from "../components/CoinCard";
import CoinTable from "../components/CoinTable";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";

const HomePage = ({ coins, filter, setFilter, limit, setLimit, sortBy, setSortBy, loading, error }) => {
    const [viewMode, setViewMode] = useState('grid');

    const processedCoins = coins.filter(coin => {
        return (coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(filter.toLowerCase()))
    });

    const filteredCoins = viewMode === 'grid' 
        ? [...processedCoins].sort((a, b) => {
            switch (sortBy) {
                case 'market_cap_desc':
                    return b.market_cap - a.market_cap;
                case 'market_cap_asc':
                    return a.market_cap - b.market_cap;
                case 'price_desc':
                    return b.current_price - a.current_price;
                case 'price_asc':
                    return a.current_price - b.current_price;
                case 'change_desc':
                    return b.price_change_percentage_24h - a.price_change_percentage_24h;
                case 'change_asc':
                    return a.price_change_percentage_24h - b.price_change_percentage_24h;
                default:
                    return 0;
            }
        })
        : processedCoins;

    return (
        <div className="home-container">
            <div className="dashboard-header">
                <h1>🚀 Crypto Dash</h1>
                <div className="view-toggle">
                    <button 
                        className={viewMode === 'grid' ? 'active' : ''} 
                        onClick={() => setViewMode('grid')}
                    >
                        Grid
                    </button>
                    <button 
                        className={viewMode === 'table' ? 'active' : ''} 
                        onClick={() => setViewMode('table')}
                    >
                        Table
                    </button>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter} />
                <LimitSelector limit={limit} onLimitChange={setLimit} />
                {viewMode === 'grid' && <SortSelector sortBy={sortBy} onChange={setSortBy} />}
            </div>

            {!loading && !error && (
                viewMode === 'grid' ? (
                    <main className="grid">
                        {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
                            <CoinCard key={coin.id} coin={coin} />
                        )) : (<p>No matching coins</p>)}
                    </main>
                ) : (
                    <CoinTable coins={filteredCoins} />
                )
            )}
        </div>
    );
};

export default HomePage;
