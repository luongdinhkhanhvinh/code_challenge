"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ArrowDown, RefreshCw } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import type { TokenData } from "../types";
import TokenSelector from "./TokenSelector";
import { formatCurrency } from "../utils";

interface SwapFormProps {
  tokens: TokenData[];
}

export default function SwapForm({ tokens }: SwapFormProps) {
  const [fromToken, setFromToken] = useState<TokenData | null>(
    tokens[0] || null
  );
  const [toToken, setToToken] = useState<TokenData | null>(tokens[1] || null);
  const [amount, setAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [slippage, setSlippage] = useState<number>(0.5); // Default slippage 0.5%
  const [activeTab, setActiveTab] = useState("swap");

  // Calculate exchange rate when tokens or amount changes
  useEffect(() => {
    if (fromToken && toToken && fromToken.price && toToken.price) {
      const rate = toToken.price / fromToken.price;
      setExchangeRate(rate);

      if (amount && !isNaN(Number.parseFloat(amount))) {
        const calculatedAmount = (Number.parseFloat(amount) * rate).toString();
        setReceiveAmount(calculatedAmount);
      } else {
        setReceiveAmount("");
      }
    } else {
      setExchangeRate(null);
      setReceiveAmount("");
    }
  }, [fromToken, toToken, amount]);

  const handleAmountChange = (value: string) => {
    // Allow only numbers and a single decimal point
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError(null);
    setSuccess(null);

    // Validate inputs
    if (!fromToken || !toToken) {
      setError("Please select tokens for the swap");
      return;
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (Number.parseFloat(amount) > fromToken.balance) {
      setError(`Insufficient ${fromToken.symbol} balance`);
      return;
    }

    // Simulate API call
    setIsSubmitting(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful swap
      setSuccess(
        `Successfully swapped ${amount} ${fromToken.symbol} to ${formatCurrency(
          Number.parseFloat(receiveAmount)
        )} ${toToken.symbol}`
      );

      // Reset form
      setAmount("");
      setReceiveAmount("");
    } catch (err) {
      setError("Failed to complete the swap. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-border">
          <Tabs.Trigger
            value="swap"
            className="flex-1 px-4 py-3 text-sm font-medium text-center transition-colors data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Swap
          </Tabs.Trigger>
          <Tabs.Trigger
            value="buy"
            className="flex-1 px-4 py-3 text-sm font-medium text-center transition-colors data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Buy
          </Tabs.Trigger>
          <Tabs.Trigger
            value="sell"
            className="flex-1 px-4 py-3 text-sm font-medium text-center transition-colors data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Sell
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="swap" className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Swap</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-accent">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3.5V12.5M8 3.5L5 6.5M8 3.5L11 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-accent">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 4.5H13.5M4.5 8H11.5M6.5 11.5H9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* From Token Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">From</label>
                {fromToken && (
                  <span className="text-sm text-muted-foreground">
                    Balance: {formatCurrency(fromToken.balance)}{" "}
                    {fromToken.symbol}
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full h-12 px-3 rounded-lg border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {fromToken && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={() => setAmount(fromToken.balance.toString())}
                    >
                      MAX
                    </button>
                  )}
                </div>

                <TokenSelector
                  tokens={tokens}
                  selectedToken={fromToken}
                  onSelectToken={setFromToken}
                  otherToken={toToken}
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/50 hover:border-primary hover:bg-primary/10"
                onClick={handleSwapTokens}
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>

            {/* To Token Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">To</label>
                {toToken && (
                  <span className="text-sm text-muted-foreground">
                    Balance: {formatCurrency(toToken.balance)} {toToken.symbol}
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="0.00"
                    value={
                      receiveAmount
                        ? formatCurrency(Number.parseFloat(receiveAmount))
                        : ""
                    }
                    readOnly
                    className="w-full h-12 px-3 rounded-lg border border-input bg-muted/50 text-lg"
                  />
                </div>

                <TokenSelector
                  tokens={tokens}
                  selectedToken={toToken}
                  onSelectToken={setToToken}
                  otherToken={fromToken}
                />
              </div>
            </div>

            {/* Exchange Rate & Slippage */}
            {exchangeRate && fromToken && toToken && (
              <div className="space-y-2 rounded-lg border border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <div className="flex items-center">
                    <span>
                      1 {fromToken.symbol} = {formatCurrency(exchangeRate, 6)}{" "}
                      {toToken.symbol}
                    </span>
                    <RefreshCw className="ml-2 h-3 w-3 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Slippage Tolerance
                  </span>
                  <div className="flex items-center space-x-2">
                    {[0.5, 1, 2, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          slippage === value
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        onClick={() => setSlippage(value)}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>

                {amount && receiveAmount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Minimum Received
                    </span>
                    <span>
                      {formatCurrency(
                        Number.parseFloat(receiveAmount) * (1 - slippage / 100),
                        6
                      )}{" "}
                      {toToken.symbol}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full h-12 rounded-lg text-base font-medium ${
                isSubmitting ||
                !amount ||
                !fromToken ||
                !toToken ||
                Number.parseFloat(amount) <= 0 ||
                (fromToken && Number.parseFloat(amount) > fromToken.balance)
                  ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
              disabled={
                isSubmitting ||
                !amount ||
                !fromToken ||
                !toToken ||
                Number.parseFloat(amount) <= 0 ||
                (fromToken && Number.parseFloat(amount) > fromToken.balance)
              }
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Swapping</span>
                  <RefreshCw className="h-4 w-4 animate-spin inline-block" />
                </>
              ) : !fromToken || !toToken ? (
                "Select Tokens"
              ) : !amount ? (
                "Enter Amount"
              ) : fromToken && Number.parseFloat(amount) > fromToken.balance ? (
                `Insufficient ${fromToken.symbol} Balance`
              ) : (
                "Swap"
              )}
            </button>
          </form>
        </Tabs.Content>

        <Tabs.Content value="buy" className="p-6">
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-muted-foreground mb-2">
              Buy functionality coming soon
            </p>
            <button
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              onClick={() => setActiveTab("swap")}
            >
              Go back to Swap
            </button>
          </div>
        </Tabs.Content>

        <Tabs.Content value="sell" className="p-6">
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-muted-foreground mb-2">
              Sell functionality coming soon
            </p>
            <button
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              onClick={() => setActiveTab("swap")}
            >
              Go back to Swap
            </button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
