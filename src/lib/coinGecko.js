const BASE_URL = "https://api.coingecko.com/api/v3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-NTKj8qJwSWSygiVfCmsSfgU4	",
  },
};

export async function getTopCoins(limit = 10) {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`,
      options,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTopCoins:", error);
    throw error;
  }
}

export async function getCoinData(id) {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    options,
  );
  if (!response.ok) throw new Error("Failed to fetch coin data");
  return response.json();
}

export async function getCoinChartData(id, days, currency) {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getCoinChartData:", error);
    throw error;
  }
}

// trending coin
export async function getTrendingCoins() {
  try {
    const response = await fetch(`${BASE_URL}/search/trending`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.coins;
  } catch (error) {
    console.error("Error in getTrendingCoins:", error);
    throw error;
  }
}
