// Full definition of interfaces
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add blockchain properties
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

// Assume Boxprops is from an UI library
interface BoxProps {
  className?: string;
  [key: string]: any;
}

interface Props extends BoxProps {}

// enum for blockchain Priorities to avoid Magic Numbers
enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99,
}

const WalletPage: React.FC<Props> = (props) => {
  const { ...rest } = props; // Remove Children for not in use
  const balances = useWalletBalances();
  const prices = usePrices();

  // Convert it into a function with a clear data type
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return BlockchainPriority.Osmosis;
      case "Ethereum":
        return BlockchainPriority.Ethereum;
      case "Arbitrum":
        return BlockchainPriority.Arbitrum;
      case "Zilliqa":
        return BlockchainPriority.Zilliqa;
      case "Neo":
        return BlockchainPriority.Neo;
      default:
        return BlockchainPriority.Default;
    }
  };

  // Use Usememo with Dependency Array correctly
  const formattedBalances = useMemo(() => {
    // Filter and arrange in one step
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Just retain balance with priority> -99 and amount> 0
        return (
          balancePriority > BlockchainPriority.Default && balance.amount > 0
        );
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Fully processing comparative cases
        if (leftPriority > rightPriority) return -1;
        if (leftPriority < rightPriority) return 1;
        // If the Priority is equal, arranged by Amount
        return rhs.amount - lhs.amount;
      })
      .map((balance: WalletBalance) => {
        // Calculate USDValue and Formatted in the same map
        const usdValue = (prices[balance.currency] || 0) * balance.amount;
        return {
          ...balance,
          formatted: balance.amount.toFixed(2), // Add decimal numbers for clear
          usdValue,
        };
      });
  }, [balances, prices]); //Both Balances and Prices are necessary

  return (
    <div {...rest}>
      {formattedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
          className="wallet-row" //Use Name class directly instead of Classes.row
          key={`${balance.blockchain}-${balance.currency}`} // Use single key
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
          blockchain={balance.blockchain}
          currency={balance.currency}
        />
      ))}
    </div>
  );
};
