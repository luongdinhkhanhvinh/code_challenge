"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { TokenData } from "../types";
import { formatCurrency } from "../utils";

interface TokenSelectorProps {
  tokens: TokenData[];
  selectedToken: TokenData | null;
  onSelectToken: (token: TokenData) => void;
  otherToken: TokenData | null;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
  otherToken,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter out the other selected token and filter by search query
  const filteredTokens = tokens.filter(
    (token) =>
      token.id !== otherToken?.id &&
      (token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Focus input when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex items-center justify-between w-[140px] h-12 px-3 rounded-lg border border-input bg-background hover:bg-accent/50"
          aria-label="Select token"
        >
          {selectedToken ? (
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={selectedToken.logoURI || "/placeholder.svg"}
                  alt={selectedToken.symbol}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // If image fails to load, replace with a fallback
                    (
                      e.target as HTMLImageElement
                    ).src = `/placeholder.svg?height=24&width=24&text=${selectedToken.symbol}`;
                  }}
                />
              </div>
              <span className="font-medium">{selectedToken.symbol}</span>
            </div>
          ) : (
            <span>Select token</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[300px] rounded-lg border border-border bg-popover shadow-md z-50"
          sideOffset={5}
          align="start"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-medium mb-2">Select a token</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name or symbol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                ref={inputRef}
              />
            </div>
          </div>

          <ScrollArea.Root className="max-h-[300px] overflow-hidden">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="p-2">
                {filteredTokens.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No tokens found
                  </div>
                ) : (
                  filteredTokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      className="flex items-center w-full p-2 rounded-md hover:bg-accent text-left"
                      onClick={() => {
                        onSelectToken(token);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-8 h-8 mr-3 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          <img
                            src={token.logoURI || "/placeholder.svg"}
                            alt={token.symbol}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // If image fails to load, replace with a fallback
                              (
                                e.target as HTMLImageElement
                              ).src = `/placeholder.svg?height=32&width=32&text=${token.symbol}`;
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-xs text-muted-foreground">
                            {token.name}
                          </span>
                        </div>
                      </div>
                      {token.price && (
                        <span className="text-sm text-muted-foreground">
                          ${formatCurrency(token.price, 2)}
                        </span>
                      )}
                      {selectedToken?.id === token.id && (
                        <Check className="ml-2 h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-muted transition-colors duration-150 ease-out hover:bg-muted/50 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-border rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
