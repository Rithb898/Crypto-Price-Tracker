import React from "react";

function CryptoTicker() {
  return (
    <div className="w-full overflow-hidden bg-gray-800 py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...coins, ...coins].map((coin, index) => (
          <div
            key={`${coin.id}-${index}`}
            className="mx-4 inline-flex items-center"
          >
            <span className="font-bold text-white">{coin.symbol}</span>
            <span className="ml-2 text-gray-300">
              {currency === "USD" ? "$" : "₹"}
              {coin.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`ml-2 ${coin.change >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {coin.change >= 0 ? "+" : ""}
              {coin.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default CryptoTicker;
