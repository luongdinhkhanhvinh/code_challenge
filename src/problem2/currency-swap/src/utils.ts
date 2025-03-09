import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, maximumFractionDigits = 6): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value)
}

export function getTokenLogoUrl(symbol: string): string {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`
}

export function generateRandomBalance(symbol: string): number {
  // For tokens with high value like BTC, generate smaller balances
  if (["BTC", "ETH", "BNB"].includes(symbol)) {
    return Number.parseFloat((Math.random() * 5).toFixed(4))
  }

  // For stablecoins, generate larger balances
  if (["USDT", "USDC", "DAI", "BUSD"].includes(symbol)) {
    return Number.parseFloat((Math.random() * 10000).toFixed(2))
  }

  // For other tokens
  return Number.parseFloat((Math.random() * 100).toFixed(2))
}

