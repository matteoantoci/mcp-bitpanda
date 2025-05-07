# MCP Bitpanda Server

A Model Context Protocol (MCP) server that exposes tools for interacting with the Bitpanda API. This server allows programmatic access to Bitpanda features like trades, wallets, and transactions via the MCP protocol.

<a href="https://glama.ai/mcp/servers/@matteoantoci/mcp-bitpanda">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@matteoantoci/mcp-bitpanda/badge" alt="Bitpanda Server MCP server" />
</a>

## Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- A Bitpanda API Key (set as `BITPANDA_API_KEY` environment variable)
- (Optional) MCP-compatible client or runner (e.g., VSCode extension, CLI)

## Setup

1. **Clone the repository or ensure you are in the project directory.**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the server:**
   ```bash
   npm run build
   ```
   This will create a `build` directory with the compiled JavaScript code.

## Running the Server

- **Directly:**
  ```bash
  node build/index.js
  ```
  or, if you have a start script:
  ```bash
  npm run start
  ```

- **Via MCP runner:**
  Configure your MCP client to run the server using stdio transport.
  Example MCP settings entry:
  ```json
  "mcp-bitpanda": {
    "transportType": "stdio",
    "command": "node",
    "args": [
      "/path/to/mcp-bitpanda/build/index.js"
    ]
    // Add environment variables, e.g., for the API key
    "environmentVariables": {
      "BITPANDA_API_KEY": "YOUR_BITPANDA_API_KEY" // Replace with your actual API key or use a secure method to provide it
    }
    // ... other optional settings ...
  }
  ```

## Available Tools

-   `get_asset_info`: Retrieves detailed information for a specific asset by its symbol (e.g., BTC, XAU).
    -   Parameters: `symbol` (string, required)
    -   Note: This tool does not require an API key.

-   `get_ohlc`: Retrieves OHLC (Open/High/Low/Close) data for a specific asset, fiat currency, and timeframe.
    -   Parameters:
        -   `symbol` (string, required): The trading symbol.
        -   `fiatCurrency` (string, required): The fiat currency (e.g., USD, EUR).
        -   `timeframe` (string, required): Either "day" or "week".
    -   Note: This tool does not require an API key.


-   `list_trades`: Lists all user's trades from the Bitpanda API. Newest trades come first. Response is cursor paginated.
    -   Parameters:
        -   `type` (string, optional): One of `buy` or `sell`.
        -   `cursor` (string, optional): Id of the last known trade by the client. Only trades after this id are returned. Empty or missing cursor parameter will return trades from the start.
        -   `page_size` (integer, optional): Size of a page for the paginated response.

-   `list_asset_wallets`: Lists all user's asset wallets grouped by asset type from the Bitpanda API.
    -   Parameters: None.

-   `list_fiat_wallets`: Lists all user's fiat wallets from the Bitpanda API.
    -   Parameters: None.

-   `list_fiat_transactions`: Lists all user's fiat transactions from the Bitpanda API. Newest fiat transactions come first. Response is cursor paginated.
    -   Parameters:
        -   `type` (string, optional): buy, sell, deposit, withdrawal, transfer, refund.
        -   `status` (string, optional): pending, processing, finished, canceled.
        -   `cursor` (string, optional): Id of the last known fiat transaction by the client. Only fiat transactions after this id are returned. Empty or missing cursor parameter will return fiat transactions from the start.
        -   `page_size` (integer, optional): Size of a page for the paginated response.

-   `list_crypto_wallets`: Lists all user's crypto wallets from the Bitpanda API.
    -   Parameters: None.

-   `list_crypto_transactions`: Lists all user's crypto transactions from the Bitpanda API. Newest crypto transactions come first. Response is cursor paginated.
    -   Parameters:
        -   `type` (string, optional): One of `buy`, `sell`, `deposit`, `withdrawal`, `transfer`, `refund` or `ico`.
        -   `status` (string, optional): One of `pending`, `processing`, `unconfirmed_transaction_out`, `open_invitation`, `finished` or `canceled`.
        -   `cursor` (string, optional): Id of the last known crypto transaction by the client. Only crypto transactions after this id are returned. Empty or missing cursor parameter will return crypto transactions from the start.
        -   `page_size` (integer, optional): Size of a page for the paginated response.

-   `list_commodity_transactions`: Lists all user's commodity transactions from the Bitpanda API. Newest commodity transactions come first. Response is cursor paginated.
    -   Parameters:
        -   `cursor` (string, optional): Id of the last known commodity transaction by the client. Only commodity transactions after this id are returned. Empty or missing cursor parameter will return commodity transactions from the start.
        -   `page_size` (integer, optional): Size of a page for the paginated response.

## Extending

To add more Bitpanda API endpoints as tools, implement a new tool file in `src/tools/` and register it in `src/tools/index.ts`.