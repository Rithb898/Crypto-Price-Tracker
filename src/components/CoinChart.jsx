import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getCoinChartData } from "../lib/coinGecko";
import { useCurrency } from "../context/CryptoContext";
import LoadingSpinner from "./LoadingSpinner";

export function CoinChart({ coinId, price_change_percentage_24h }) {
  const [timeRange, setTimeRange] = useState("7");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    async function fetchChartData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCoinChartData(
          coinId,
          parseInt(timeRange),
          currency.toLowerCase(),
        );
        const formattedData = data.prices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));
        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to load chart data. Please try again later.");
      }
    }

    fetchChartData();
  }, [coinId, timeRange, currency]);

  const currencySymbol = currency === "USD" ? "$" : "₹";

  return (
    <Card className="-mx-12 border-none bg-inherit md:mx-0 md:border-solid md:border-gray-700 md:bg-gray-800">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-end space-x-1 pr-2 md:mx-0 md:space-x-2">
          {["7", "30", "90", "365"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={
                timeRange === range
                  ? `${price_change_percentage_24h > 0 ? "bg-green-600" : "bg-red-600"} text-white`
                  : "bg-gray-800 text-white"
              }
            >
              {range === "7"
                ? "1W"
                : range === "30"
                  ? "1M"
                  : range === "90"
                    ? "3M"
                    : range === "365"
                      ? "1Y"
                      : `${range}d`}
            </Button>
          ))}
        </div>
        {loading ? (
          <div className="h-[300px]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex h-[300px] items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                axisLine={{ stroke: "#4B5563" }}
                tickLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                className="text-xs md:text-sm"
              />
              <YAxis
                axisLine={{ stroke: "#4B5563" }}
                tickLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) =>
                  `${currencySymbol}${value.toLocaleString()}`
                }
                width={65}
                domain={["auto", "auto"]}
                className="text-xs md:text-sm"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#080a0d",
                  border: "none",
                  color: "#E5E7EB",
                }}
                itemStyle={{ color: "#E5E7EB" }}
                formatter={(value) => [
                  `${currencySymbol}${value.toLocaleString()}`,
                  "Price",
                ]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={`${price_change_percentage_24h > 0 ? "#22c55e" : "#ef4444"}`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
