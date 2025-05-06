# Technical Context

This document details the technologies used, the development setup, technical constraints, and dependencies for the mcp-bitpanda project.

## Technologies Used:
- **TypeScript:** The primary language for development.
- **Node.js:** The runtime environment for the MCP server.
- **MCP Framework (`@modelcontextprotocol/sdk`):** The framework used to build and expose the tools.
- **`axios`:** HTTP client for making requests to the Bitpanda API.
- **`zod`:** Library for defining and validating tool input schemas.
- **`dotenv`:** For loading environment variables, specifically the Bitpanda API key.
- **npm/yarn:** Package managers for dependency management.

## Development Setup:
- The project is developed in a standard Node.js environment.
- Dependencies are managed via `package.json`.
- Building and linting are handled via scripts defined in `package.json`.
- A `.env` file can be used to set the `BITPANDA_API_KEY` environment variable locally.

## Technical Constraints:
- The project must adhere to the MCP specification for tool exposure.
- Interactions are limited to the endpoints provided in the Bitpanda Public API documentation.
- Bitpanda API rate limits need to be considered and potentially handled in the future.
- Securely handling the API key is critical.

## Dependencies:
- `@modelcontextprotocol/sdk`
- `axios`
- `zod`
- `dotenv`
- `@types/node` (dev dependency)
- `@types/dotenv` (dev dependency)
- `@typescript-eslint/eslint-plugin` (dev dependency)
- `@typescript-eslint/parser` (dev dependency)
- `eslint` (dev dependency)
- `eslint-config-prettier` (dev dependency)
- `eslint-plugin-import` (dev dependency)
- `eslint-plugin-prettier` (dev dependency)
- `prettier` (dev dependency)
- `typescript` (dev dependency)
- `globals` (dev dependency for eslint)
