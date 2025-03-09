import { useState, useEffect } from "react";
import axios from "axios";
import SwapForm from "./components/SwapForm";
import { PriceData, TokenData } from "./types";
import { getTokenLogoUrl, generateRandomBalance } from "./utils";

function App() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://interview.switcheo.com/prices.json"
        );
        const priceData: PriceData[] = response.data;

        const tokenMap = new Map<string, TokenData>();

        priceData.forEach((item: PriceData) => {
          const symbol = item.currency;

          if (tokenMap.has(symbol)) return;

          tokenMap.set(symbol, {
            id: symbol.toLowerCase(),
            name: getTokenName(symbol),
            symbol: symbol,
            logoURI: getTokenLogoUrl(symbol),
            price: parseFloat(item.price),
            balance: generateRandomBalance(symbol),
          });
        });

        const tokenArray = Array.from(tokenMap.values())
          .filter((token) => token.price && token.price > 0)
          .sort((a, b) => (b.price || 0) - (a.price || 0));

        setTokens(tokenArray);
      } catch (err) {
        console.error("Failed to fetch token data:", err);
        setError("Failed to load tokens. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  function getTokenName(symbol: string): string {
    const tokenNames: Record<string, string> = {
      BTC: "Bitcoin",
      ETH: "Ethereum",
      USDT: "Tether USD",
      USDC: "USD Coin",
      BNB: "Binance Coin",
      XRP: "Ripple",
      ADA: "Cardano",
      SOL: "Solana",
      DOGE: "Dogecoin",
      DOT: "Polkadot",
      AVAX: "Avalanche",
      MATIC: "Polygon",
      LINK: "Chainlink",
      UNI: "Uniswap",
      ATOM: "Cosmos",
      LTC: "Litecoin",
      ALGO: "Algorand",
      NEAR: "NEAR Protocol",
      SWTH: "Switcheo",
    };

    return tokenNames[symbol] || symbol;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SwapForm tokens={tokens} />
      </div>
    </div>
  );
}

export default App;
