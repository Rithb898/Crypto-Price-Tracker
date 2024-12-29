import { cn } from "../lib/utils";
import { Star, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useCurrency } from "../context/CryptoContext";
import { isInWatchlist, toggleWatchlistItem } from "../lib/localStorage";
import { Toaster } from "react-hot-toast";

function TrendingCard({ currentData, loading }) {
  const { currency } = useCurrency();
  const navigation = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(
    function () {
      const newFavorites = {};
      currentData.forEach(function (coin) {
        newFavorites[coin.item.id] = isInWatchlist(coin.item.id);
      });
      setIsFavorite(newFavorites);
    },
    [currentData],
  );

  const handleStarClick = function (id) {
    toggleWatchlistItem(id);
    setIsFavorite(function (prev) {
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
        <div className="flex flex-wrap justify-center gap-6">
          <Toaster position="top-right" />
          {currentData.map((coin) => (
            <motion.div
              className={`rounded-lg hover:transition-all hover:duration-300 ${coin.price_change_percentage_24h > 0 ? "hover:border-2 hover:border-green-500" : "hover:border-2 hover:border-red-500"}`}
              key={coin.item.id}
              onClick={() => navigation(`/coin/${coin.item.id}`)}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-[300px] w-[300px] rounded-lg bg-[#dadada] p-8 dark:bg-gray-900">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.item.large}
                        alt={`${coin.item.id} icon`}
                        className="size-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold uppercase text-black dark:text-inherit">
                          {coin.item.symbol}
                        </h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-inherit">
                          {coin.item.name}
                        </p>
                      </div>
                    </div>
                    <button
                      className="rounded-full border-2 border-gray-500 p-2 hover:bg-gray-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarClick(coin.item.id);
                      }}
                    >
                      <Star
                        className={cn(
                          "size-6",
                          isFavorite[coin.item.id]
                            ? `${coin.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"}`
                            : `${coin.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "text-green-500" : "text-red-500"}`,
                        )}
                      />
                    </button>
                  </div>
                  <div className="my-4 flex items-center gap-2">
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
                      ].toFixed(3)}
                      %
                    </span>
                    <div
                      className={`flex items-center rounded-full border-2 p-1.5 ${coin.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "border-green-500" : "border-red-500"}`}
                    >
                      {coin.item.data.price_change_percentage_24h[
                        currency.toLowerCase()
                      ] > 0 ? (
                        <TrendingUp
                          className="size-6 text-green-500"
                          strokeWidth={3}
                        />
                      ) : (
                        <TrendingDown className="size-6 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 space-y-6">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xl font-semibold ${coin.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        $
                        {coin.item.data.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-400">
                          Total Volume :
                        </span>
                        <span className="text-base text-gray-500 dark:text-gray-200">
                          {coin.item.data.total_volume.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-400">
                          Market Cap :
                        </span>
                        <span className="text-base text-gray-500 dark:text-gray-200">
                          ${coin.item.data.market_cap.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}

export default TrendingCard;
