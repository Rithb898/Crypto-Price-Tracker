import { useState, useEffect } from "react";
import CoinCard from "../components/CoinCard";
import CoinList from "../components/CoinList";
import LoadingSpinner from "../components/LoadingSpinner";
import ViewToggel from "../components/ViewToggel";
import { getWatchlist, toggleWatchlistItem } from "../lib/localStorage";
import { getTopCoins } from "../lib/coinGecko";
import SearchBar from "../components/SearchBar";

function FavoritePage() {
  const [view, setView] = useState("grid");
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlistData() {
      setLoading(true);
      try {
        const watchlist = getWatchlist();
        const allCoins = await getTopCoins(250); // Fetch more coins to ensure we have data for all watchlist items
        const watchlistData = allCoins.filter((coin) =>
          watchlist.includes(coin.id),
        );
        setCryptoData(watchlistData);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlistData();
  }, []);

  useEffect(() => {
    async function fetchWatchlistData() {
      setLoading(true);
      try {
        const watchlist = getWatchlist();
        const allCoins = await getTopCoins(250); // Fetch more coins to ensure we have data for all watchlist items
        const watchlistData = allCoins.filter((coin) =>
          watchlist.includes(coin.id),
        );
        setCryptoData(watchlistData);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlistData();
  }, [toggleWatchlistItem]);

  return (
    <div>
      <SearchBar />
      <ViewToggel view={view} setView={setView} />
      <div>
        {cryptoData.length === 0 ? (
          <div className="text-center text-white">
            <p>Your watchlist is empty. Add some coins to track them here!</p>
          </div>
        ) : (
          <div>
            {view === "grid" ? (
              <CoinCard currentData={cryptoData} loading={loading} />
            ) : (
              <CoinList currentData={cryptoData} loading={loading} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;
