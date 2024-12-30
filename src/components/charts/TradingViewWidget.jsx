import { useEffect, useRef } from "react";

export function TradingViewWidget({
  symbol,
  theme = "dark",
  height = "500px",
}) {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "450",
        autosize: true,
        symbol: `BINANCE:${symbol}`,
        interval: "D",
        timezone: "Etc/UTC",
        theme: theme,
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
        hide_legend: true,
      });
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        const script = container.current.querySelector("script");
        if (script) {
          container.current.removeChild(script);
        }
      }
    };
  }, [symbol, theme]);

  return <div ref={container} className="tradingview-widget-container" />;
}

export default TradingViewWidget;
