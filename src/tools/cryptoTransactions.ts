import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL, getBitpandaApiKey } from '../config.js';

// Define the input schema shape for the list_crypto_transactions tool
const listCryptoTransactionsInputSchemaShape = {
  type: z
    .enum(['buy', 'sell', 'deposit', 'withdrawal', 'transfer', 'refund', 'ico'])
    .optional()
    .describe('One of `buy`, `sell`, `deposit`, `withdrawal`, `transfer`, `refund` or `ico`.'),
  status: z
    .enum(['pending', 'processing', 'unconfirmed_transaction_out', 'open_invitation', 'finished', 'canceled'])
    .optional()
    .describe(
      'One of `pending`, `processing`, `unconfirmed_transaction_out`, `open_invitation`, `finished` or `canceled`.'
    ),
  cursor: z
    .string()
    .optional()
    .describe(
      'Id of the last known crypto transaction by the client. Only crypto transactions after this id are returned. Empty or missing cursor parameter will return crypto transactions from the start.'
    ),
  page_size: z.number().int().positive().optional().describe('Size of a page for the paginated response'),
};

type RawSchemaShape = typeof listCryptoTransactionsInputSchemaShape;
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
      confirmations: number;
      in_or_out: string; // Assuming string based on example ('outgoing', 'incoming')
      type: string;
      status: string;
      amount_eur: string;
      purpose_text: string;
      related_wallet_transaction_id: string;
      related_wallet_id: string;
      wallet_id: string;
      confirmed: boolean;
      cryptocoin_id: string;
      last_changed: {
        date_iso8601: string;
        unix: string;
      };
      fee: string;
      current_fiat_id: string;
      current_fiat_amount: string;
      tx_id: string;
    };
    id: string;
  }>;
  meta: {
    total_count: number;
    cursor?: string;
    next_cursor?: string;
    page_size: number;
  };
  links: {
    next?: string;
    self: string;
  };
};

// Define the handler function for the list_crypto_transactions tool
const listCryptoTransactionsHandler = async (input: Input): Promise<Output> => {
  try {
    const apiKey = getBitpandaApiKey();
    const url = `${BITPANDA_API_BASE_URL}/wallets/transactions`;

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
    console.error('Error fetching Bitpanda crypto transactions:', error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred while fetching crypto transactions.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch Bitpanda crypto transactions: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for list_crypto_transactions
export const listCryptoTransactionsTool: BitpandaToolDefinition = {
  name: 'list_crypto_transactions',
  description:
    "Lists all user's crypto transactions from the Bitpanda API. Newest crypto transactions come first. Response is cursor paginated.",
  inputSchemaShape: listCryptoTransactionsInputSchemaShape,
  handler: listCryptoTransactionsHandler,
};
