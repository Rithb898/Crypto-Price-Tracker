import { BarChart2, Search, Star, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import PriceTicker from "../components/PriceTicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getTrendingCoins } from "../lib/coinGecko";

function HomePage2() {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Prices",
      description:
        "Get up-to-the-second cryptocurrency prices from reliable sources.",
    },
    {
      icon: BarChart2,
      title: "Detailed Charts",
      description:
        "Analyze price movements with interactive TradingView charts.",
    },
    {
      icon: Search,
      title: "Comprehensive Data",
      description:
        "Access in-depth information on thousands of cryptocurrencies.",
    },
    {
      icon: Star,
      title: "Favorites",
      description: "Save and track your favorite coins for quick access.",
    },
  ];

  useEffect(() => {
    async function fetchTrendingCoins() {
      try {
        const data = await getTrendingCoins(1);
        setTrendingCoins(data);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      }
    }
    fetchTrendingCoins();
  }, []);


  // filter 6 item and save it on other state variable
  const topCoins = trendingCoins.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="py-40 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-6xl">
            Track Crypto in Real-Time
          </h1>
          <p className="mb-8 text-xl text-black dark:text-white md:text-2xl">
            Stay updated with live prices, charts, and market insights.
          </p>
          <InteractiveHoverButton className="text-black hover:text-white dark:text-white hover:dark:text-black">
            <Link to="/crypto">Start Tracking</Link>
          </InteractiveHoverButton>
        </div>
      </section>
      <PriceTicker />

      {/* fetures Section */}
      <section className="py-20 mt-10 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">
            Why Choose CryptoTrack?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-gray-700 dark:text-white"
              >
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-2 text-purple-600 dark:text-purple-400" />
                  <CardTitle className="dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 mt-10 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-4xl font-bold text-center text-white">
            Trending Cryptocurrencies
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {trendingCoins.slice(0, 8).map((coin) => (
              // <div
              //   key={coin.item.id}
              //   className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-gray-700 dark:text-white"
              // >
              //   <div className="flex items-center gap-4">
              //     <img
              //       src={coin.item.small}
              //       alt={coin.item.name}
              //       className="w-12 h-12 rounded-full"
              //     />
              //     <div>
              //       <h3 className="text-xl font-semibold">{coin.item.name}</h3>
              //       <p className="text-gray-500 uppercase">
              //         {coin.item.symbol}
              //       </p>
              //     </div>
              //   </div>
              //   <div className="mt-4">
              //     <div className="flex items-center justify-between">
              //       <div className="text-gray-500">
              //         Price: $
              //         {coin.item.data.price.toFixed(2) > 0.0
              //           ? coin.item.data.price.toFixed(2)
              //           : coin.item.data.price.toFixed(8)}
              //       </div>
              //       <div
              //         className={`font-semibold ${
              //           coin.item.data.price_change_percentage_24h["usd"] >= 0
              //             ? "text-green-500"
              //             : "text-red-500"
              //         }`}
              //       >
              //         {coin.item.data.price_change_percentage_24h[
              //           "usd"
              //         ]?.toFixed(2)}{" "}
              //         %
              //       </div>
              //     </div>
              //   </div>
              // </div>
              <Card
                key={coin.item.id}
                className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-gray-700 dark:text-white"
              >
                <CardHeader className="flex justify-center">
                  <img
                    src={coin.item.small}
                    alt={coin.item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {coin.item.name}
                      </h3>
                      <p className="text-gray-500 uppercase">
                        {coin.item.symbol}
                      </p>
                    </div>
                    <div
                      className={`font-semibold ${coin.item.data.price_change_percentage_24h["usd"] >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {coin.item.data.price_change_percentage_24h[
                        "usd"
                      ]?.toFixed(2)}{" "}
                      %
                    </div>
                  </div>
                </CardHeader>
                <CardDescription className="px-6">
                  <div
                    className={`text-lg font-semibold ${coin.item.data.price_change_percentage_24h["usd"] >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    Price: $
                    {coin.item.data.price.toFixed(2) > 0.0
                      ? coin.item.data.price.toFixed(2)
                      : coin.item.data.price.toFixed(6)}
                  </div>
                  <div>
                    <div className="text-base dark:text-gray-300">
                      Market Cap: {coin.item.data.market_cap.toLocaleString()}
                    </div>
                  </div>
                </CardDescription>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-black dark:border-white"
            >
              <Link to="/trending">View All Coins</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage2;
