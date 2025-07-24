# Minecraft MCP Server (Cloudflare Worker)

[![CI](https://github.com/Tyler-Staut/Minecraft-MCP/actions/workflows/ci.yml/badge.svg)](https://github.com/Tyler-Staut/Minecraft-MCP/actions/workflows/ci.yml)

Easily deploy a remote Model Context Protocol (MCP) server for Minecraft Java server status queries, running on Cloudflare Workers—no authentication required.

## 🚀 Quick Deploy

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Tyler-Staut/Minecraft-MCP)

This will deploy your MCP server to a URL like:

```
https://minecraft-mcp.<your-account>.workers.dev/mcp
https://minecraft-mcp.<your-account>.workers.dev/sse
```

## 🛠️ Local Development

```bash
npm install
npm run dev
```

## 🧩 Add Your Own Tools

Define new tools in `src/worker.ts` using `this.server.tool(...)` inside the `MinecraftMCP` class.

## 🤖 Connect to MCP Clients

- **Cloudflare AI Playground:**
  1. Go to https://playground.ai.cloudflare.com/
  2. Enter your `/mcp` endpoint URL.
- **Any MCP Client (via mcp-remote):**
  ```json
  {
    "mcpServers": {
      "minecraft-mcp": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "https://minecraft-mcp.<your-account>.workers.dev/mcp"
        ]
      }
    }
  }
  ```

## 📦 Endpoints

- `/mcp` — Main MCP JSON-RPC endpoint
- `/sse` — Server-Sent Events (SSE) endpoint for streaming

## 📄 License

MIT
