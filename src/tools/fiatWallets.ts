import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_fiat_wallets tool (no parameters)
const listFiatWalletsInputSchemaShape = {};

type RawSchemaShape = typeof listFiatWalletsInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;
// Define the expected output structure based on the API documentation
type Output = {
  data: Array<{
    type: string;
    attributes: {
      fiat_id: string;
      fiat_symbol: string;
      balance: string;
      name: string;
      pending_transactions_count: number;
    };
    id: string;
  }>;
};

// Define the handler function for the list_fiat_wallets tool
const listFiatWalletsHandler = async (_input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/fiatwallets`;

    const response = await axios.get<Output>(url, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Return the data received from the Bitpanda API
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching Bitpanda fiat wallets:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while fetching fiat wallets.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda fiat wallets: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_fiat_wallets
export const listFiatWalletsTool: BitpandaToolDefinition = {
  name: 'list_fiat_wallets',
  description: "Lists all user's fiat wallets from the Bitpanda API.",
  inputSchemaShape: listFiatWalletsInputSchemaShape,
  handler: listFiatWalletsHandler,
};
