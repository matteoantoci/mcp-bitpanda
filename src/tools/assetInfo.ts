import { z } from 'zod';
import { findAssetBySymbol } from './utils/assetUtils.js'; // Import the shared utility

// Define the input schema shape for the get_asset_info tool
const assetInfoInputSchemaShape = {
  symbol: z.string().describe('The trading symbol of the asset (e.g., BTC, XAU)'),
};

type RawSchemaShape = typeof assetInfoInputSchemaShape;
type Input = z.infer<z.ZodObject<RawSchemaShape>>;

// Define the expected output structure (simplified, based on the documentation summary)
type Output = {
  type: string;
  attributes: Record<string, any>; // Use Record<string, any> for flexibility
  id: string;
};

// Define the handler function for the get_asset_info tool
const assetInfoHandler = async (input: Input): Promise<Output> => {
  try {
    const foundAsset = await findAssetBySymbol(input.symbol);

    // Return the found asset object
    return foundAsset;
  } catch (error: unknown) {
    console.error('Error fetching asset info:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while fetching asset info.';
    // Re-throwing the error to be handled by the MCP server framework
    throw new Error(`Failed to fetch asset info: ${message}`);
  }
};

// Define the tool definition object structure
type BitpandaToolDefinition = {
  name: string;
  description: string;
  inputSchemaShape: RawSchemaShape;
  handler: (input: Input) => Promise<Output>;
};

// Export the tool definition for get_asset_info
export const assetInfoTool: BitpandaToolDefinition = {
  name: 'get_asset_info',
  description: 'Retrieves detailed information for a specific asset by its symbol.',
  inputSchemaShape: assetInfoInputSchemaShape,
  handler: assetInfoHandler,
};
