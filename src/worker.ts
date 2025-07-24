import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with tools
export class MinecraftMCP extends McpAgent {
  server = new McpServer({
    name: "Minecraft MCP Server",
    version: "1.0.0",
    description: "Query any Minecraft Java server for status, version, player list, MOTD, icon, mods, and more."
  });

  async init() {
    this.server.tool(
      "getServerStatus",
      "Get the status, version, player list, MOTD, icon, mods, and more for a Minecraft Java server by address.",
      { address: z.string().describe("The address (host or host:port) of the Minecraft Java server to query.") },
      async ({ address }: { address: string }) => {
        const apiUrl = `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(address)}`;
        const resp = await fetch(apiUrl);
        if (!resp.ok) {
          return {
            content: [
              {
                type: "text",
                text: `Error: Failed to fetch server status for ${address}`,
                _meta: {}
              }
            ]
          };
        }
        const data = await resp.json();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
              _meta: {}
            }
          ]
        };
      }
    );
  }
}

export default {
  fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MinecraftMCP.serveSSE("/sse").fetch(request, env, ctx);
    }
    if (url.pathname === "/mcp") {
      return MinecraftMCP.serve("/mcp").fetch(request, env, ctx);
    }
    return new Response("Not found", { status: 404 });
  }
};
