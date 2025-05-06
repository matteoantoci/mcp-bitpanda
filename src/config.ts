import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export const BITPANDA_API_BASE_URL = 'https://api.bitpanda.com/v1';

export const getBitpandaApiKey = (): string => {
  const apiKey = process.env.BITPANDA_API_KEY;
  if (!apiKey) {
    throw new Error('BITPANDA_API_KEY environment variable is not set.');
  }
  return apiKey;
};
