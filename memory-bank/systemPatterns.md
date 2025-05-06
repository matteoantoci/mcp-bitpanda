# System Patterns

This document outlines the system architecture, key technical decisions, design patterns in use, and component relationships within the mcp-bitpanda project.

## Architecture:
The project is structured as an MCP server, exposing interactions with the Bitpanda API as tools. It follows a modular design, with each major Bitpanda API resource or group of endpoints implemented in a separate tool file.

## Key Technical Decisions:
- Use TypeScript for type safety and code maintainability.
- Utilize the MCP framework for tool exposure and communication.
- Use `axios` for making HTTP requests to the Bitpanda API.
- Manage the Bitpanda API key via an environment variable (`BITPANDA_API_KEY`) for security.
- Implement cursor-based pagination logic within tool handlers for relevant API endpoints.

## Design Patterns:
- **Module Pattern:** Each Bitpanda API resource's tools are encapsulated within their own module file (`src/tools/*.ts`).
- **Configuration Object:** A dedicated module (`src/config.ts`) for managing API-related configuration.

## Component Relationships:
- **MCP Server (`src/index.ts`):** The main component that hosts and exposes the Bitpanda tools.
- **Tool Modules (`src/tools/*.ts`):** Individual modules for each Bitpanda API resource, containing the API interaction logic and tool definitions.
- **Tool Registration (`src/tools/index.ts`):** A central module responsible for importing and registering all individual tools with the MCP server.
- **Configuration Module (`src/config.ts`):** Provides API base URL and API key to the tool handlers.
- **Axios:** Used by tool handlers to make HTTP requests to the Bitpanda API.
