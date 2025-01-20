import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getTopCoins } from "../lib/coinGecko";

function PriceTicker() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function fetchTopCoins() {
      try {
        const data = await getTopCoins(10);
        setCoins(data);
      } catch (error) {
        console.error("Error fetching top coins:", error);
      }
    }
    fetchTopCoins();
    const interval = setInterval(fetchTopCoins, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);
  // console.log(coins);
  return (
    <div className="overflow-hidden bg-opacity-50 py-2 dark:bg-opacity-70">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {coins.map((coin) => (
          <div key={coin.id} className="mx-6 flex items-center gap-2">
            <img src={coin.image} alt={coin.name} className="h-8 w-8" />
            <span className="text-black dark:text-white">
              ${coin.current_price.toFixed(2)}
            </span>
            <span
              className={` ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default PriceTicker;
