import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_crypto_wallets tool (no parameters)
const listCryptoWalletsInputSchemaShape = {};

type RawSchemaShape = typeof listCryptoWalletsInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;
// Define the expected output structure based on the API documentation
type Output = {
  data: Array<{
    type: string;
    attributes: {
      cryptocoin_id: string;
      cryptocoin_symbol: string;
      balance: string;
      is_default: boolean;
      name: string;
      pending_transactions_count: number;
      deleted: boolean;
    };
    id: string;
  }>;
};

// Define the handler function for the list_crypto_wallets tool
const listCryptoWalletsHandler = async (_input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/wallets`; // Note: API uses /wallets for crypto

    const response = await axios.get<Output>(url, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Return the data received from the Bitpanda API
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching Bitpanda crypto wallets:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while fetching crypto wallets.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda crypto wallets: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_crypto_wallets
export const listCryptoWalletsTool: BitpandaToolDefinition = {
  name: 'list_crypto_wallets',
  description: "Lists all user's crypto wallets from the Bitpanda API.",
  inputSchemaShape: listCryptoWalletsInputSchemaShape,
  handler: listCryptoWalletsHandler,
};
