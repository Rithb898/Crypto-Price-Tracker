import { Star, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useCurrency } from "../context/CryptoContext";
import { isInWatchlist, toggleWatchlistItem } from "../lib/localStorage";
import { Toaster } from "react-hot-toast";

function TrendingList({ currentData, loading }) {
  const { currency } = useCurrency();
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigate();

  useEffect(
    function () {
      const newFavorites = {};
      currentData.forEach(function (coin) {
        newFavorites[coin.item.id] = isInWatchlist(coin.item.id);
      });
      setFavorites(newFavorites);
    },
    [currentData],
  );

  const handleStarClick = function (id) {
    toggleWatchlistItem(id);
    setFavorites(function (prev) {
      return { ...prev, [id]: !prev[id] };
    });
  };

  return (
    <>
      {loading ? (
        <div className="h-[60vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Toaster position="top-right" />
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 font-medium dark:text-gray-400">
                  Asset
                </th>
                <th className="px-4 py-3 font-medium dark:text-gray-400">
                  Price
                </th>
                <th className="px-4 py-3 font-medium dark:text-gray-400">
                  Change
                </th>
                <th className="hidden px-4 py-3 font-medium dark:text-gray-400 lg:table-cell">
                  Total Volume
                </th>
                <th className="hidden px-4 py-3 font-medium dark:text-gray-400 lg:table-cell">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((coin) => (
                <motion.tr
                  key={coin.item.id}
                  onClick={() => navigation(`/coin/${coin.item.id}`)}
                  className="hover:bg-[#f3f3f3] dark:hover:bg-gray-900"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        className="rounded-full p-1.5 hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarClick(coin.item.id);
                        }}
                      >
                        <Star
                          className={cn(
                            "h-5 w-5",
                            favorites[coin.item.id]
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-500",
                          )}
                        />
                      </button>
                      <img
                        src={coin.item.large}
                        alt={`${coin.item.id} icon`}
                        className="rounded-full size-8 md:size-10"
                      />
                      <div>
                        <h3 className="font-semibold uppercase dark:text-white md:text-lg">
                          {coin.item.symbol}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
                          {coin.item.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`font-semibold md:text-lg ${coin.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      ${coin.item.data.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`hidden items-center rounded-full border-2 p-1.5 md:flex ${coin.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "border-green-500" : "border-red-500"}`}
                      >
                        {coin.item.data.price_change_percentage_24h[
                          currency.toLowerCase()
                        ] > 0 ? (
                          <TrendingUp className="text-green-500 size-6" />
                        ) : (
                          <TrendingDown className="text-red-500 size-6" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-5 py-3 text-sm font-semibold",
                          coin.item.data.price_change_percentage_24h[
                            currency.toLowerCase()
                          ] > 0
                            ? "bg-green-500/30 text-green-500 dark:bg-green-500/10"
                            : "bg-red-500/30 text-red-500 dark:bg-red-500/10",
                        )}
                      >
                        {coin.item.data.price_change_percentage_24h[
                          currency.toLowerCase()
                        ] > 0
                          ? "+"
                          : ""}
                        {coin.item.data.price_change_percentage_24h[
                          currency.toLowerCase()
                        ].toFixed(2)}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="hidden px-4 py-4 lg:table-cell">
                    <span className="dark:text-gray-300">
                      {coin.item.data.total_volume.toLocaleString()}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 lg:table-cell">
                    <span className="dark:text-gray-300">
                      ${coin.item.data.market_cap.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TrendingList;
