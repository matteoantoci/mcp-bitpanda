# Product Context

This document describes the purpose of the mcp-bitpanda project, the problems it solves, how it should work, and the user experience goals.

## Purpose:
The primary purpose of this project is to provide a set of reliable and easy-to-use tools for interacting with the Bitpanda API within the Model Context Protocol (MCP) framework. This allows users to access their Bitpanda account data programmatically.

## Problems Solved:
- Provides a standardized way to access Bitpanda account information (trades, wallets, transactions).
- Enables integration of Bitpanda data into various applications or workflows through the MCP.
- Simplifies the process of retrieving user-specific data from the Bitpanda exchange.

## How it Should Work:
The project should expose key Bitpanda API endpoints as individual MCP tools. Users should be able to call these tools with relevant parameters (like pagination cursors or filters) and receive the data from the Bitpanda API as output. The tools should handle API key authentication and potential API errors.

## User Experience Goals:
- Users should find it easy to understand and use the provided MCP tools for Bitpanda.
- The tools should be reliable and return accurate data from the API.
- Documentation for each tool should be clear and comprehensive, explaining the inputs, outputs, and any specific Bitpanda API considerations (like pagination).
- Secure handling of the user's Bitpanda API key is paramount.
