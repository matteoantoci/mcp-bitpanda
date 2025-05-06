import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerBitpandaTools } from './tools/index.js'; // Import the tool registration function

const main = async () => {
  const server = new McpServer({
    name: 'mcp-bitpanda',
    version: '1.0.0',
    description: 'MCP Server for interacting with the Bitpanda API.',
    // Add authentication if needed - Bitpanda API uses API Key in header
  });

  // Register tools
  registerBitpandaTools(server);

  console.log('Starting MCP Bitpanda Server...');
  // Use Stdio transport to connect
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log(`Server connected via stdio.`);
};

main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
