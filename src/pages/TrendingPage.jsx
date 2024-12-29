import { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";
import CoinList from "../components/CoinList";
import { PaginationComponent } from "../components/PaginationComponent";
import SearchBar from "../components/SearchBar";
import ViewToggel from "../components/ViewToggel";
import { getTrendingCoins } from "../lib/coinGecko";
import React from "react";
import TrendingCard from "../components/TrendingCard";
import TrendingList from "../components/TrendingList";

const ITEMS_PER_PAGE = 10;

function TrendingPage() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");

  useEffect(() => {
    async function fetchTrendingCoins() {
      setLoading(true);
      try {
        const data = await getTrendingCoins(250);
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      }
    }
    fetchTrendingCoins();
  }, []);

  const totalPages = Math.ceil(cryptoData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = cryptoData.slice(startIndex, endIndex);
  // console.log(currentData);

  return (
    <>
      <SearchBar />
      <ViewToggel view={view} setView={setView} />
      <div>
        {view === "grid" ? (
          <TrendingCard currentData={currentData} loading={loading} />
        ) : (
          <TrendingList currentData={currentData} loading={loading} />
        )}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default TrendingPage;
