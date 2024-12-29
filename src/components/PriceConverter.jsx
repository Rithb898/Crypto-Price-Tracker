import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function PriceConverter({ price, symbol, name }) {
  const [usdAmount, setUsdAmount] = useState("1");
  const [inrAmount, setInrAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(75); // Default exchange rate

  useEffect(() => {
    // In a real application, you would fetch the current exchange rate here
    // For now, we'll use a static exchange rate
    setExchangeRate(75);
  }, []);

  useEffect(() => {
    const usd = parseFloat(usdAmount) || 0;
    setInrAmount((usd * exchangeRate).toFixed(2));
  }, [usdAmount, exchangeRate]);

  const handleUsdChange = (e) => {
    setUsdAmount(e.target.value);
  };

  const handleInrChange = (e) => {
    const inr = parseFloat(e.target.value) || 0;
    setInrAmount(e.target.value);
    setUsdAmount((inr / exchangeRate).toFixed(2));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="usd-input" className="text-white">
          {name}
        </Label>
        <Input
          id="usd-input"
          type="number"
          value={usdAmount}
          onChange={handleUsdChange}
          className="w-2/3 bg-gray-700 text-white"
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="inr-input" className="text-white">
          INR
        </Label>
        <Input
          id="inr-input"
          type="number"
          value={inrAmount}
          onChange={handleInrChange}
          className="w-2/3 bg-gray-700 text-white"
        />
      </div>
      <div className="text-gray-400">
        1 {symbol} = ${price.toFixed(2)} USD = ₹
        {(price * exchangeRate).toFixed(2)} INR
      </div>
    </div>
  );
}
