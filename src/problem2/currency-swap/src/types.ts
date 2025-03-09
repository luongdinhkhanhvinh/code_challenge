export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  logoURI?: string;
  price?: number;
  balance: number;
}

export interface PriceData {
  currency: string;
  date: string;
  price: string;
}
