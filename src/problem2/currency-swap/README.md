### Currency Swap Form



A modern, intuitive currency swap interface that allows users to exchange assets between different cryptocurrencies. This project was built as a solution to the "Fancy Form" challenge, focusing on creating a visually appealing and user-friendly experience.

## 🚀 Technologies

This project leverages a modern tech stack:

- **React** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Axios** - Promise-based HTTP client
- **Lucide React** - Beautiful, consistent icons


## ✨ Features

- **Real-time Exchange Rates**: Fetches and displays current token prices
- **Token Selection**: Intuitive interface to select from available tokens
- **Balance Management**: Shows available balances for each token
- **Slippage Control**: Adjustable slippage tolerance settings
- **Responsive Design**: Works seamlessly across all device sizes
- **Dark Mode Support**: Toggle between light and dark themes
- **Form Validation**: Prevents invalid transactions
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages for failed operations


## 📋 Requirements

- Node.js 16+
- npm or pnpm


## 🛠️ Installation

1. Clone the repository:


```shellscript
git clone https://github.com/luongdinhkhanhvinh/code_challenge.git
cd problem2/currency-swap
```

2. Install dependencies:


```shellscript
pnpm install
```

3. Start the development server:


```shellscript
pnpm dev
```

4. Open your browser and navigate to:


```plaintext
http://localhost:5173
```

## 🔧 Project Structure

```plaintext
currency-swap/
├── public/
├── src/
│   ├── components/
│   │   ├── SwapForm.tsx       # Main swap form component
│   │   ├── TokenSelector.tsx  # Token selection dropdown
│   │   └── theme-provider.tsx # Theme context provider
│   ├── types.ts               # TypeScript interfaces
│   ├── utils.ts               # Utility functions
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🌟 Implementation Details

### Token Data

The application fetches token data from the Switcheo API endpoint:

```plaintext
https://interview.switcheo.com/prices.json
```

Token icons are sourced from the Switcheo token-icons repository:

```plaintext
https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/
```

### Exchange Rate Calculation

Exchange rates are calculated based on the relative prices of the selected tokens:

```typescript
const rate = toToken.price / fromToken.price;
```

### Slippage Tolerance

Users can select from predefined slippage tolerance values (0.5%, 1%, 2%, 5%) to account for price movements during transaction processing.

## 🔄 Workflow

1. **Select Tokens**: Choose the tokens you want to swap from and to
2. **Enter Amount**: Specify how much of the source token you want to swap
3. **Review Details**: Check the exchange rate and minimum amount to receive
4. **Confirm Swap**: Execute the transaction


## 🧪 Future Improvements

- Add transaction history
- Implement wallet connection
- Add price charts
- Support for limit orders
- Gas fee estimation


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Switcheo](https://www.switcheo.com/) for providing the token data API
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system