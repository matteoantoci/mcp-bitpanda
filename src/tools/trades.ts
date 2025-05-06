import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_trades tool
const listTradesInputSchemaShape = {
  type: z.enum(['buy', 'sell']).optional().describe('One of `buy` or `sell`'),
  cursor: z
    .string()
    .optional()
    .describe(
      'Id of the last known trade by the client. Only trades after this id are returned. Empty or missing cursor parameter will return trades from the start.'
    ),
  page_size: z.number().int().positive().optional().describe('Size of a page for the paginated response'),
};

type RawSchemaShape = typeof listTradesInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;
// Define the expected output structure based on the API documentation
type Output = {
  data: Array<{
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
      is_savings?: boolean; // Optional based on commodity example
    };
    id: string;
  }>;
  meta: {
    total_count: number;
    next_cursor?: string;
    page_size: number;
    cursor?: string; // Included based on crypto transactions example
  };
  links: {
    next?: string;
    self: string;
  };
};

// Define the handler function for the list_trades tool
const listTradesHandler = async (input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/trades`;

    const params: any = {}; // Use any for now, refine later if needed
    if (input.type) {
      params.type = input.type;
    }
    if (input.cursor) {
      params.cursor = input.cursor;
    }
    if (input.page_size) {
      params.page_size = input.page_size;
    }

    const response = await axios.get<Output>(url, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json', // Assuming JSON content type
      },
      params,
    });

    // Return the data received from the Bitpanda API
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching Bitpanda trades:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while fetching trades.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda trades: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_trades
export const listTradesTool: BitpandaToolDefinition = {
  name: 'list_trades',
  description: "Lists all user's trades from the Bitpanda API. Newest trades come first. Response is cursor paginated.",
  inputSchemaShape: listTradesInputSchemaShape,
  handler: listTradesHandler,
};
