import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_fiat_transactions tool
const listFiatTransactionsInputSchemaShape = {
  type: z
    .enum(['buy', 'sell', 'deposit', 'withdrawal', 'transfer', 'refund'])
    .optional()
    .describe('buy, sell, deposit, withdrawal, transfer, refund'),
  status: z
    .enum(['pending', 'processing', 'finished', 'canceled'])
    .optional()
    .describe('pending, processing, finished, canceled'),
  cursor: z
    .string()
    .optional()
    .describe(
      'Id of the last known fiat transaction by the client. Only fiat transactions after this id are returned. Empty or missing cursor parameter will return fiat transactions from the start.'
    ),
  page_size: z.number().int().positive().optional().describe('Size of a page for the paginated response'),
};

type RawSchemaShape = typeof listFiatTransactionsInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;
// Define the expected output structure based on the API documentation
type Output = {
  data: Array<{
    type: string;
    attributes: {
      fiat_wallet_id: string;
      user_id: string;
      fiat_id: string;
      amount: string;
      fee: string;
      to_eur_rate: string;
      time: {
        date_iso8601: string;
        unix: string;
      };
      in_or_out: string; // Assuming string based on example ('outgoing', 'incoming')
      type: string;
      status: string;
      confirmation_by: string;
      confirmed: boolean;
      payment_option_id: string;
      requires_2fa_approval: boolean;
      last_changed: {
        date_iso8601: string;
        unix: string;
      };
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

// Define the handler function for the list_fiat_transactions tool
const listFiatTransactionsHandler = async (input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/fiatwallets/transactions`;

    const params: any = {}; // Use any for now, refine later if needed
    if (input.type) {
      params.type = input.type;
    }
    if (input.status) {
      params.status = input.status;
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
        'Content-Type': 'application/json',
      },
      params,
    });

    // Return the data received from the Bitpanda API
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching Bitpanda fiat transactions:', error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred while fetching fiat transactions.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda fiat transactions: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_fiat_transactions
export const listFiatTransactionsTool: BitpandaToolDefinition = {
  name: 'list_fiat_transactions',
  description:
    "Lists all user's fiat transactions from the Bitpanda API. Newest fiat transactions come first. Response is cursor paginated.",
  inputSchemaShape: listFiatTransactionsInputSchemaShape,
  handler: listFiatTransactionsHandler,
};
