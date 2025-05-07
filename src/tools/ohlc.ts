import { z } from 'zod';
import axios from 'axios';
import { BITPANDA_API_BASE_URL } from '../config.js'; // Use .js extension for local import

// Define the input schema shape for the get_ohlc tool
const ohlcInputSchemaShape = {
  symbol: z.string().describe('The trading symbol of the asset (e.g., BTC, XAU)'),
  fiatCurrency: z.string().describe('The fiat currency (e.g., USD, EUR)'),
  timeframe: z.enum(['day', 'week']).describe('The timeframe for the OHLC data (day or week)'),
};

type RawSchemaShape = typeof ohlcInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;

// Define the expected output structure based on the provided Zod schema
type Output = z.infer<typeof ohlcOutputSchema>; // Use z.infer for the output schema

const ohlcOutputSchema = z.object({
  data: z.array(
    z.object({
      type: z.string(),
      attributes: z.object({
        open: z.string(),
        high: z.string(),
        low: z.string(),
        close: z.string(),
        time: z.object({ date_iso8601: z.string(), unix: z.string() }),
      }),
    })
  ),
});

// Define the handler function for the get_ohlc tool
const ohlcHandler = async (input: Input): Promise<Output> => {
  try {
    // First, get the asset ID from the currencies endpoint
    const currenciesResponse = await axios.get(`${BITPANDA_API_BASE_URL}/currencies`);
    const currenciesData = currenciesResponse.data.data.attributes;

    const assetTypes = ['commodities', 'cryptocoins', 'etfs', 'etcs', 'fiat_earns'];
    let assetId = null;

    for (const type of assetTypes) {
      if (currenciesData[type] && Array.isArray(currenciesData[type])) {
        const foundAsset = currenciesData[type].find((asset: any) => asset.attributes?.symbol === input.symbol);
        if (foundAsset) {
          assetId = foundAsset.id;
          break;
        }
      }
    }

    if (!assetId) {
      throw new Error(`Asset with symbol "${input.symbol}" not found.`);
    }

    // Then, fetch the OHLC data using the asset ID
    const ohlcResponse = await axios.get(
      `${BITPANDA_API_BASE_URL}/ohlc/${assetId}/${input.fiatCurrency}/${input.timeframe}`
    );
    const ohlcData = ohlcResponse.data;

    // Validate the response against the output schema
    const validatedData = ohlcOutputSchema.parse(ohlcData);

    return validatedData;
  } catch (error: unknown) {
    console.error('Error fetching OHLC data:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while fetching OHLC data.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch OHLC data: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for get_ohlc
export const ohlcTool: BitpandaToolDefinition = {
  name: 'get_ohlc',
  description: 'Retrieves OHLC data for a specific asset, fiat currency, and timeframe.',
  inputSchemaShape: ohlcInputSchemaShape,
  handler: ohlcHandler,
};
