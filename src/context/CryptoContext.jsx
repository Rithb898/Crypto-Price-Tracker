import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [cryptoData, setCryptoData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, cryptoData, setCryptoData, trendingData, setTrendingData }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
