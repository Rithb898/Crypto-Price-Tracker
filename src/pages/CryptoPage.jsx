import ViewToggel from "../components/layout/ViewToggel";
import SearchBar from "../components/layout/SearchBar";
import { useEffect, useMemo, useState } from "react";
import CoinCard from "../components/CoinCard";
import CoinList from "../components/CoinList";
// import { cryptoData } from "../cryptoData";
import { PaginationComponent } from "../components/layout/PaginationComponent";
import { getTopCoins } from "../lib/coinGecko";
import { useCurrency } from "../context/CryptoContext";
import { LoadingOverlay } from "../components/LoadingOverlay";

const ITEMS_PER_PAGE = 15;

function CryptoPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const { currency, cryptoData, setCryptoData } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchTopCoins() {
      setLoading(true);
      try {
        const data = await getTopCoins(250);
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      }
    }
    fetchTopCoins();
  }, []);

  const filteredCryptoData = useMemo(() => {
    if (!searchQuery) return cryptoData;
    const lowercasedQuery = searchQuery.toLowerCase();
    return cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(lowercasedQuery) ||
        crypto.symbol.toLowerCase().includes(lowercasedQuery),
    );
  }, [cryptoData, searchQuery]);

  const totalPages = Math.ceil(filteredCryptoData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredCryptoData.slice(startIndex, endIndex);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  return (
    <>
      {loading && <LoadingOverlay />}
      <SearchBar onSearch={handleSearch} />
      <ViewToggel view={view} setView={setView} />
      <div>
        {view === "grid" ? (
          <CoinCard currentData={currentData} loading={loading} />
        ) : (
          <CoinList currentData={currentData} loading={loading} />
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

export default CryptoPage;
