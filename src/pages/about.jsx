const AboutPage = () => {
    return (
        <div className="about-page">
            <h1>About Crypto Dash</h1>
            <p>Crypto Dash is a small React dashboard built to fetch and display real-time cryptocurrency data using the CoinGecko API.</p>
            <p>The app includes: </p>
            <ul>
                <li>Live pricing and market cap data for top cryptocurrencies</li>
                <li>Search and filter by coin name or symbol</li>
                <li>Sorting by market cap, price, and 24h change</li>
                <li>Adjustable result limits for faster browsing</li>
            </ul>
            <p>This project is designed to demonstrate React state management, router integration, and API data loading with a clean, responsive UI.</p>
        </div>
    );
}

export default AboutPage;
