# MCP Bitpanda Server

A Model Context Protocol (MCP) server that exposes tools for interacting with the Bitpanda API. This server allows programmatic access to Bitpanda features like trades, wallets, and transactions via the MCP protocol.

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

(This section will be updated as tools are implemented)

## Extending

To add more Bitpanda API endpoints as tools, implement a new tool file in `src/tools/` and register it in `src/tools/index.ts`.
