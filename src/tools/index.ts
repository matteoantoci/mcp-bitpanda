import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listTradesTool } from './trades.js'; // Import the listTradesTool
import { listAssetWalletsTool } from './assetWallets.js'; // Import the listAssetWalletsTool
import { listFiatWalletsTool } from './fiatWallets.js'; // Import the listFiatWalletsTool
import { listFiatTransactionsTool } from './fiatTransactions.js'; // Import the listFiatTransactionsTool
import { listCryptoWalletsTool } from './cryptoWallets.js'; // Import the listCryptoWalletsTool
import { listCryptoTransactionsTool } from './cryptoTransactions.js'; // Import the listCryptoTransactionsTool
import { listCommodityTransactionsTool } from './commodity.js'; // Import the listCommodityTransactionsTool
import { assetInfoTool } from './assetInfo.js'; // Import the assetInfoTool
// import { ohlcTool } from './ohlc.js'; // Import the ohlcTool

// Placeholder type for tool definition, similar to mcp-indicators
type BitpandaToolDefinition = {
  name: string;
  description: string;
  // Expecting the raw shape object for Zod validation
  inputSchemaShape: z.ZodRawShape;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (input: any) => Promise<any>;
};

// Define the list of tools (will be populated later by importing from individual files)
const bitpandaToolDefinitions: BitpandaToolDefinition[] = [
  listTradesTool, // Add the listTradesTool to the array
  listAssetWalletsTool, // Add the listAssetWalletsTool to the array
  listFiatWalletsTool, // Add the listFiatWalletsTool to the array
  listFiatTransactionsTool, // Add the listFiatTransactionsTool to the array
  listCryptoWalletsTool, // Add the listCryptoWalletsTool to the array
  listCryptoTransactionsTool, // Add the listCryptoTransactionsTool to the array
  listCommodityTransactionsTool, // Add the listCommodityTransactionsTool to the array
  assetInfoTool, // Add the assetInfoTool to the array
  // ohlcTool, // Add the ohlcTool to the array
  // Other tools will be added here as they are implemented
];

/**
 * Registers all Bitpanda tools with the MCP server.
 * @param server The McpServer instance.
 */
export const registerBitpandaTools = (server: McpServer): void => {
  bitpandaToolDefinitions.forEach((toolDef) => {
    try {
      // Pass the raw shape to the inputSchema parameter, assuming SDK handles z.object()
      server.tool(toolDef.name, toolDef.description, toolDef.inputSchemaShape, async (input) => {
        const result = await toolDef.handler(input);
        // Assuming the handler returns the data directly, wrap it in the MCP content format
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      });
      console.log(`Registered Bitpanda tool: ${toolDef.name}`);
    } catch (error) {
      console.error(`Failed to register tool ${toolDef.name}:`, error);
    }
  });
};
