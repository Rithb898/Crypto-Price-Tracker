import toast, { Toaster } from "react-hot-toast";

export function getWatchlist() {
  if (typeof window === "undefined") return [];
  const watchlist = localStorage.getItem("watchlist");
  return watchlist ? JSON.parse(watchlist) : [];
}

export function toggleWatchlistItem(coinId) {
  if (typeof window === "undefined") return;
  const watchlist = getWatchlist();
  const index = watchlist.indexOf(coinId);
  if (index === -1) {
    watchlist.push(coinId);
    toast.success("Coin added from Watchlist");
  } else {
    watchlist.splice(index, 1);
    toast.error("Coin removed to Watchlist");
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

export function isInWatchlist(coinId) {
  if (typeof window === "undefined") return false;
  const watchlist = getWatchlist();
  return watchlist.includes(coinId);
}
