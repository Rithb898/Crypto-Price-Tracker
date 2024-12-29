import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cryptoData } from "../cryptoData";
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CoinChart } from "../components/CoinChart";
import { PriceConverter } from "../components/PriceConverter";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import Footer from "../components/Footer";
// import TradingViewWidget from "../components/TradingViewWidget";

function CoinDetails() {
  const { coinId } = useParams();
  const navigation = useNavigate();
  return (
    <div>
      {cryptoData.map((coin) => {
        if (coin.id === coinId) {
          console.log(coin);
          return (
            <div className="min-h-screen text-white" key={coin.id}>
              <div className="container mx-auto py-8">
                <div
                  onClick={() => navigation("/")}
                  className="mb-6 inline-flex cursor-pointer items-center text-[#00D7FE] transition-colors duration-200 hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to list
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start justify-between gap-8 lg:flex-row"
                >
                  <div className="w-full flex-1">
                    <Card className="mb-8 border-gray-700 bg-gray-800 shadow-lg">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="h-16 w-16 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-2xl font-bold text-white md:text-3xl">
                            {coin.name}
                          </CardTitle>
                          <CardDescription className="text-xl text-gray-400">
                            {coin.symbol.toUpperCase()}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                          <div
                            className={`text-2xl font-bold md:text-4xl ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            ${coin.current_price.toLocaleString()}
                          </div>
                          <div
                            className={`flex items-center gap-2 md:gap-5 ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            <div
                              className={`flex items-center rounded-full border-2 p-1.5 ${coin.price_change_percentage_24h > 0 ? "border-green-500" : "border-red-500"}`}
                            >
                              {coin.price_change_percentage_24h > 0 ? (
                                <TrendingUp
                                  className="h-6 w-6"
                                  strokeWidth={3}
                                />
                              ) : (
                                <TrendingDown
                                  className="h-6 w-6"
                                  strokeWidth={3}
                                />
                              )}
                            </div>
                            <span
                              className={cn(
                                "rounded-full px-2 py-2 text-xl font-semibold md:px-5 md:text-2xl",
                                coin.price_change_percentage_24h > 0
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-red-500/10 text-red-500",
                              )}
                            >
                              {coin.price_change_percentage_24h > 0 ? "+" : ""}
                              {coin.price_change_percentage_24h.toFixed(3)}%
                            </span>
                          </div>
                        </div>
                        <CoinChart
                          coinId={coin.id}
                          price_change_percentage_24h={
                            coin.price_change_percentage_24h
                          }
                        />
                        {/* <TradingViewWidget
                          symbol={`${coin.symbol.toUpperCase()}USD`}
                        /> */}
                        {/* <TradingViewWidget /> */}
                      </CardContent>
                    </Card>

                    <Card className="border-gray-700 bg-gray-800 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">
                          Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <StatItem
                            label="Market Cap"
                            value={`$${coin.market_cap.toLocaleString()}`}
                          />
                          <StatItem
                            label="24h Volume"
                            value={`${coin.total_volume.toLocaleString()}`}
                          />
                          <StatItem
                            label="Circulating Supply"
                            value={`${coin.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`}
                          />
                          <StatItem
                            label="Total Supply"
                            value={
                              coin.total_supply
                                ? `${coin.total_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`
                                : "N/A"
                            }
                          />
                          <StatItem
                            label="All Time High"
                            value={`$${coin.ath.toLocaleString()}`}
                          />
                          <StatItem
                            label="All Time Low"
                            value={`$${coin.atl.toLocaleString()}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="w-full lg:w-1/3">
                    <Card className="sticky top-4 mb-7 border-gray-700 bg-gray-800 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">
                          {coin.name} Converter
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PriceConverter
                          price={coin.current_price}
                          symbol={coin.symbol.toUpperCase()}
                          name={coin.name}
                        />
                      </CardContent>
                    </Card>
                    {/* <Card className="sticky top-4 border-gray-700 bg-gray-800 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">
                          More Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <DetailItem
                            label="Website"
                            value={coin.links.homepage?.[0] ?? "N/A"}
                            isLink={!!coin.links.homepage?.[0]}
                          />
                          <DetailItem
                            label="Explorer"
                            value={coin.links.blockchain_site?.[0] ?? "N/A"}
                            isLink={!!coin.links.blockchain_site?.[0]}
                          />
                          <DetailItem
                            label="Reddit"
                            value={coin.links.subreddit_url ?? "N/A"}
                            isLink={!!coin.links.subreddit_url}
                          />
                          <DetailItem
                            label="GitHub"
                            value={
                              coin.links.repos_url.github?.[0]
                                ? `https://github.com/${coin.links.repos_url.github[0]}`
                                : "N/A"
                            }
                            isLink={!!coin.links.repos_url.github?.[0]}
                          />
                          <DetailItem
                            label="Twitter Followers"
                            value={
                              coin.community_data?.twitter_followers?.toLocaleString() ??
                              "N/A"
                            }
                          />
                          <DetailItem
                            label="Reddit Subscribers"
                            value={
                              coin.community_data?.reddit_subscribers?.toLocaleString() ??
                              "N/A"
                            }
                          />
                        </div>
                      </CardContent>
                    </Card> */}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CoinDetails;

function StatItem({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-700 p-4 transition-all duration-200 hover:bg-gray-600">
      <p className="mb-1 text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

// function DetailItem({ label, value, isLink = false }) {
//   return (
//     <div className="flex items-center justify-between">
//       <span className="text-gray-400">{label}:</span>
//       {isLink ? (
//         <a
//           href={value}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-[#00D7FE] hover:underline"
//         >
//           {value.replace(/(^\w+:|^)\/\//, "")}
//         </a>
//       ) : (
//         <span className="text-white">{value}</span>
//       )}
//     </div>
//   );
// }
