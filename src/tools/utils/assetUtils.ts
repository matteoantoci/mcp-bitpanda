import axios from 'axios';
import { BITPANDA_API_BASE_URL } from '../../config.js'; // Adjust path for utility file

// Define a type for the asset structure based on the currencies endpoint response
type BitpandaAsset = {
  type: string;
  id: string;
  attributes: {
    symbol: string;
    // Add other relevant attributes if needed
    [key: string]: any;
  };
};

/**
 * Fetches asset information from the Bitpanda currencies endpoint and finds an asset by its symbol.
 * @param symbol The trading symbol of the asset (e.g., BTC, XAU).
 * @returns The found asset object.
 * @throws Error if the asset is not found or API call fails.
 */
export const findAssetBySymbol = async (symbol: string): Promise<BitpandaAsset> => {
  try {
    const currenciesResponse = await axios.get(`${BITPANDA_API_BASE_URL}/currencies`);
    const currenciesData = currenciesResponse.data.data.attributes;

    const assetTypes = ['commodities', 'cryptocoins', 'etfs', 'etcs', 'fiat_earns'];
    let foundAsset: BitpandaAsset | null = null;

    for (const type of assetTypes) {
      if (currenciesData[type] && Array.isArray(currenciesData[type])) {
        foundAsset = currenciesData[type].find((asset: any) => asset.attributes?.symbol === symbol);
        if (foundAsset) {
          break; // Found the asset, stop searching
        }
      }
    }

    if (!foundAsset) {
      throw new Error(`Asset with symbol "${symbol}" not found.`);
    }

    return foundAsset;
  } catch (error: unknown) {
    console.error(`Error finding asset by symbol "${symbol}":`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while finding the asset.';
    throw new Error(`Failed to find asset by symbol: ${message}`);
  }
};
