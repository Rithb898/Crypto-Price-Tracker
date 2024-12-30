import { useEffect, useState } from "react";
import { PaginationComponent } from "../components/layout/PaginationComponent";
import SearchBar from "../components/layout/SearchBar";
import ViewToggel from "../components/layout/ViewToggel";
import { getTrendingCoins } from "../lib/coinGecko";
import React from "react";
import TrendingCard from "../components/TrendingCard";
import TrendingList from "../components/TrendingList";
import { useCurrency } from "../context/CryptoContext";
import { LoadingOverlay } from "../components/LoadingOverlay";

const ITEMS_PER_PAGE = 10;

function TrendingPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");

  const { currency, trendingData, setTrendingData } = useCurrency();

  useEffect(() => {
    async function fetchTrendingCoins() {
      setLoading(true);
      try {
        const data = await getTrendingCoins(250);
        setTrendingData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingCoins();
  }, []);

  const totalPages = Math.ceil(trendingData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = trendingData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen">
      {loading && <LoadingOverlay />}
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
    </div>
  );
}

export default TrendingPage;
