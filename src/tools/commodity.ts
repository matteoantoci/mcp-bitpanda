import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_commodity_transactions tool
const listCommodityTransactionsInputSchemaShape = {
  cursor: z
    .string()
    .optional()
    .describe(
      'Id of the last known commodity transaction by the client. Only commodity transactions after this id are returned. Empty or missing cursor parameter will return commodity transactions from the start.'
    ),
  page_size: z.number().int().positive().optional().describe('Size of a page for the paginated response'),
};

type RawSchemaShape = typeof listCommodityTransactionsInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;
// Define the expected output structure based on the API documentation
type Output = {
  data: Array<{
    type: string;
    attributes: {
      amount: string;
      recipient: string;
      time: {
        date_iso8601: string;
        unix: string;
      };
      in_or_out: string; // Assuming string based on example ('incoming')
      type: string; // Assuming string based on example ('buy')
      status: string; // Assuming string based on example ('finished')
      amount_eur: string;
      wallet_id: string;
      confirmed: boolean;
      cryptocoin_id: string; // Note: API uses cryptocoin_id for commodities too
      trade?: {
        // Optional, present if transaction is a trade
        type: string;
        attributes: {
          status: string;
          type: string;
          cryptocoin_id: string;
          fiat_id: string;
          amount_fiat: string;
          amount_cryptocoin: string;
          fiat_to_eur_rate: string;
          wallet_id: string;
          fiat_wallet_id: string;
          payment_option_id: string;
          time: {
            date_iso8601: string;
            unix: string;
          };
          price: string;
          is_swap: boolean;
          is_savings: boolean;
        };
        id: string;
      };
      last_changed: {
        date_iso8601: string;
        unix: string;
      };
      fee: string;
      current_fiat_id: string;
      current_fiat_amount: string;
      tx_id: string; // Assuming string based on example ('internal')
      is_savings: boolean;
      is_metal_storage_fee: boolean;
      tags: string[]; // Assuming array of strings
    };
    id: string;
  }>;
  meta: {
    total_count: number;
    next_cursor?: string;
    page_size: number;
    cursor?: string;
  };
  links: {
    next?: string;
    self: string;
  };
};

// Define the handler function for the list_commodity_transactions tool
const listCommodityTransactionsHandler = async (input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/assets/transactions/commodity`;

    const params: any = {}; // Use any for now, refine later if needed
    if (input.cursor) {
      params.cursor = input.cursor;
    }
    if (input.page_size) {
      params.page_size = input.page_size;
    }

    const response = await axios.get<Output>(url, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      params,
    });

    // Return the data received from the Bitpanda API
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching Bitpanda commodity transactions:', error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred while fetching commodity transactions.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda commodity transactions: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_commodity_transactions
export const listCommodityTransactionsTool: BitpandaToolDefinition = {
  name: 'list_commodity_transactions',
  description:
    "Lists all user's commodity transactions from the Bitpanda API. Newest commodity transactions come first. Response is cursor paginated.",
  inputSchemaShape: listCommodityTransactionsInputSchemaShape,
  handler: listCommodityTransactionsHandler,
};
