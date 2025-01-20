import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, TrendingDown, TrendingUp, ArrowUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CoinChart } from "../components/charts/CoinChart";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { getCoinData } from "../lib/coinGecko";
import LoadingSpinner from "../components/LoadingSpinner";
import TradingViewWidget from "../components/charts/TradingViewWidget";
import { LoadingOverlay } from "../components/LoadingOverlay";

function CoinDetails() {
  const { coinId } = useParams();
  const navigation = useNavigate();
  const [coinDetails, setCoinDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("coin");
  const [amount, setAmount] = useState(1);
  const [fromCrypto, setFromCrypto] = useState(true);

  useEffect(() => {
    async function fetchCoinDetails() {
      setLoading(true);
      try {
        const data = await getCoinData(coinId);
        setCoinDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      }
    }
    fetchCoinDetails();
  }, [coinId]);

  const calculateConversion = (value, fromCrypto) => {
    const price = coinDetails.market_data.current_price.usd;
    return fromCrypto ? (value * price).toFixed(2) : (value / price).toFixed(8);
  };

  const USDIcon = () => (
    <svg
      className="w-5 h-5 text-gray-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
    </svg>
  );



  return (
    <>
      {loading ? (
        <div className="h-[100vh]">
          <LoadingSpinner />
          <LoadingOverlay />
        </div>
      ) : (
        <div
          className="min-h-screen text-gray-900 bg-white dark:bg-inherit dark:text-white"
          key={coinDetails.id}
        >
          <div className="container py-8 mx-auto">
            <div
              onClick={() => navigation("/")}
              className="mb-6 inline-flex cursor-pointer items-center text-blue-600 transition-colors duration-200 hover:underline dark:text-[#00D7FE]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to list
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start justify-between gap-8 lg:flex-row"
            >
              <div className="flex-1 w-full">
                <Card className="mb-8 bg-white border-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <img
                      src={coinDetails.image.large}
                      alt={coinDetails.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                        {coinDetails.name}
                      </CardTitle>
                      <CardDescription className="text-xl text-gray-400">
                        {coinDetails.symbol.toUpperCase()}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`text-2xl font-bold md:text-4xl ${coinDetails.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        $
                        {coinDetails.market_data.current_price.usd.toLocaleString()}
                      </div>
                      <div
                        className={`flex items-center gap-2 md:gap-5 ${coinDetails.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        <div
                          className={`flex items-center rounded-full border-2 p-1.5 ${coinDetails.market_data.price_change_percentage_24h > 0 ? "border-green-500" : "border-red-500"}`}
                        >
                          {coinDetails.market_data.price_change_percentage_24h >
                          0 ? (
                            <TrendingUp className="w-6 h-6" strokeWidth={3} />
                          ) : (
                            <TrendingDown className="w-6 h-6" strokeWidth={3} />
                          )}
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2 py-2 text-xl font-semibold md:px-5 md:text-2xl",
                            coinDetails.market_data
                              .price_change_percentage_24h > 0
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500",
                          )}
                        >
                          {coinDetails.market_data.price_change_percentage_24h >
                          0
                            ? "+"
                            : ""}
                          {coinDetails.market_data.price_change_percentage_24h.toFixed(
                            3,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 mb-4">
                      <button
                        className={`rounded-lg px-4 py-2 ${
                          activeChart === "coin"
                            ? "bg-blue-500 text-white dark:bg-[#00D7FE] dark:text-black"
                            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                        }`}
                        onClick={() => setActiveChart("coin")}
                      >
                        Price Chart
                      </button>
                      <button
                        className={`rounded-lg px-4 py-2 ${
                          activeChart === "trading"
                            ? "bg-blue-500 text-white dark:bg-[#00D7FE] dark:text-black"
                            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                        }`}
                        onClick={() => setActiveChart("trading")}
                      >
                        Trading View
                      </button>
                    </div>
                    {activeChart === "coin" ? (
                      <CoinChart
                        coinId={coinDetails.id}
                        price_change_percentage_24h={
                          coinDetails.market_data.price_change_percentage_24h
                        }
                      />
                    ) : (
                      <TradingViewWidget
                        symbol={`${coinDetails.symbol.toUpperCase()}USD`}
                      />
                    )}
                  </CardContent>
                </Card>

                <Card className="border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Price Converter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative flex flex-col gap-8 p-4">
                      <div className="relative flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-gray-400">
                          {fromCrypto ? (
                            <>
                              <img
                                src={coinDetails.image.small}
                                alt={coinDetails.symbol}
                                className="w-5 h-5"
                              />
                              {coinDetails.symbol.toUpperCase()}
                            </>
                          ) : (
                            <>
                              <USDIcon />
                              USD
                            </>
                          )}
                        </label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full rounded-xl bg-white/50 p-4 text-2xl text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:text-white dark:focus:bg-gray-700 dark:focus:ring-[#00D7FE]"
                          placeholder="0.00"
                        />
                      </div>

                      <button
                        onClick={() => setFromCrypto(!fromCrypto)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                      >
                        <div className="rounded-full bg-[#00D7FE] p-3 text-black transition-transform hover:rotate-180 hover:scale-110">
                          <ArrowUpDown strokeWidth={2} />
                        </div>
                      </button>

                      <div className="relative flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-gray-400">
                          {fromCrypto ? (
                            <>
                              <USDIcon />
                              USD
                            </>
                          ) : (
                            <>
                              <img
                                src={coinDetails.image.small}
                                alt={coinDetails.symbol}
                                className="w-5 h-5"
                              />
                              {coinDetails.symbol.toUpperCase()}
                            </>
                          )}
                        </label>
                        <div className="w-full p-4 rounded-xl bg-white/50 dark:bg-gray-700/50">
                          <div className="text-2xl font-medium text-gray-900 dark:text-white">
                            {calculateConversion(amount, fromCrypto)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full lg:w-1/3">
                <Card className="sticky bg-white border-gray-200 shadow-lg top-4 dark:border-gray-700 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Market Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <MarketStatItem
                        label="Market Cap Rank"
                        value={`#${coinDetails.market_data.market_cap_rank}`}
                      />
                      <MarketStatItem
                        label="Market Cap"
                        value={`$${coinDetails.market_data.market_cap.usd.toLocaleString()}`}
                      />
                      <MarketStatItem
                        label="24h High"
                        value={`$${coinDetails.market_data.high_24h.usd.toLocaleString()}`}
                      />
                      <MarketStatItem
                        label="24h Low"
                        value={`$${coinDetails.market_data.low_24h.usd.toLocaleString()}`}
                      />
                      <MarketStatItem
                        label="Available Supply"
                        value={`${coinDetails.market_data.circulating_supply.toLocaleString()} ${coinDetails.symbol.toUpperCase()}`}
                      />
                      <MarketStatItem
                        label="Total Supply"
                        value={
                          coinDetails.total_supply
                            ? `${coinDetails.market_data.total_supply.toLocaleString()} ${coinDetails.symbol.toUpperCase()}`
                            : "∞"
                        }
                      />
                      <MarketStatItem
                        label="Max Supply"
                        value={
                          coinDetails.max_supply
                            ? `${coinDetails.market_data.max_supply.toLocaleString()} ${coinDetails.symbol.toUpperCase()}`
                            : "∞"
                        }
                      />
                      <MarketStatItem
                        label="All Time High"
                        value={`$${coinDetails.market_data.ath.usd.toLocaleString()}`}
                      />
                      <MarketStatItem
                        label="All Time Low"
                        value={`$${coinDetails.market_data.atl.usd.toLocaleString()}`}
                      />
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Bullish Sentiment
                        </span>
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24 h-2 overflow-hidden bg-gray-700 rounded-full">
                            <div
                              className="h-full bg-green-500"
                              style={{
                                width: `${coinDetails.sentiment_votes_up_percentage}%`,
                              }}
                            />
                          </div>
                          <span className="font-medium text-green-500">
                            {coinDetails.sentiment_votes_up_percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Bearish Sentiment
                        </span>
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24 h-2 overflow-hidden bg-gray-700 rounded-full">
                            <div
                              className="h-full bg-red-500"
                              style={{
                                width: `${coinDetails.sentiment_votes_down_percentage}%`,
                              }}
                            />
                          </div>
                          <span className="font-medium text-red-500">
                            {coinDetails.sentiment_votes_down_percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoinDetails;

function StatItem({ label, value }) {
  return (
    <div className="p-4 transition-all duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
      <p className="mb-1 text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function MarketStatItem({ label, value }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}
