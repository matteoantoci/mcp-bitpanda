import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_asset_wallets tool (no parameters)
const listAssetWalletsInputSchemaShape = {};

type RawSchemaShape = typeof listAssetWalletsInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;
// Define the expected output structure based on the API documentation
type Output = {
  data: {
    type: string;
    attributes: {
      cryptocoin?: {
        // Optional as it might not exist if user has no crypto
        type: string;
        attributes: {
          wallets: Array<{
            type: string;
            attributes: {
              cryptocoin_id: string;
              cryptocoin_symbol: string;
              balance: string;
              is_default: boolean;
              name: string;
              deleted: boolean;
            };
            id: string;
          }>;
        };
      };
      commodity?: {
        // Optional as it might not exist if user has no commodities
        metal: {
          type: string;
          attributes: {
            wallets: Array<{
              type: string;
              attributes: {
                cryptocoin_id: string; // Note: API uses cryptocoin_id/symbol for metals too
                cryptocoin_symbol: string;
                balance: string;
                is_default: boolean;
                name: string;
                deleted: boolean;
              };
              id: string;
            }>;
          };
        };
      };
      // Add other asset types (stocks, ETFs) if they appear in the API response and are needed
    };
  };
  last_user_action: {
    date_iso8601: string;
    unix: string;
  };
};

// Define the handler function for the list_asset_wallets tool
const listAssetWalletsHandler = async (_input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/asset-wallets`;

    const response = await axios.get<Output>(url, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Return the data received from the Bitpanda API
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching Bitpanda asset wallets:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while fetching asset wallets.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda asset wallets: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_asset_wallets
export const listAssetWalletsTool: BitpandaToolDefinition = {
  name: 'list_asset_wallets',
  description: "Lists all user's asset wallets grouped by asset type from the Bitpanda API.",
  inputSchemaShape: listAssetWalletsInputSchemaShape,
  handler: listAssetWalletsHandler,
};
