import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrendingPage from "./pages/TrendingPage";
import FavoritePage from "./pages/FavoritePage";
import CoinDetails from "./pages/CoinDetails";
import Header from "./components/layout/Header";
import { CurrencyProvider } from "./context/CryptoContext";
import { ThemeProvider } from "./context/theme";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import CryptoPage from "./pages/CryptoPage";
import HomePage2 from "./pages/HomePage2";

function App() {
  const [themeMode, setThemeMode] = useState("dark");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  // actual change in theme

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <CurrencyProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<HomePage2 />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/coin/:coinId" element={<CoinDetails />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
