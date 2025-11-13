# qlik-mcp-registry

MCP Registry for use with GitHub Copilot settings

## GitHub Pages API

This registry is published on GitHub Pages and provides the following endpoints:

### Endpoints

- **GET** `/v0.1/servers` - List all available servers
- **GET** `/v0.1/servers/{serverName}/versions/latest` - Get the latest version of a server
- **GET** `/v0.1/servers/{serverName}/versions/{version}` - Get a specific version of a server

### Example Usage

```bash
# List all servers
curl https://qlik-oss.github.io/qlik-mcp-registry/v0.1/servers

# Get latest GitHub MCP Server
curl https://qlik-oss.github.io/qlik-mcp-registry/v0.1/servers/github-mcp-server/versions/latest

# Get specific version
curl https://qlik-oss.github.io/qlik-mcp-registry/v0.1/servers/github-mcp-server/versions/0.20.2
```

## File Structure

```
docs/
└── v0.1/
    └── servers/
        ├── index.json                          # /v0.1/servers
        └── {serverName}/
            ├── latest.json                     # /v0.1/servers/{serverName}/versions/latest
            └── {version}.json                  # /v0.1/servers/{serverName}/versions/{version}
```

## Adding New Servers

1. Create a directory for the server: `docs/v0.1/servers/{serverName}/`
2. Add version files: `{version}.json`
3. Add a `latest.json` file pointing to the latest version
4. Update `docs/v0.1/servers/index.json` to include the new server

## Deployment

This repository uses GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

To enable GitHub Pages:
1. Go to repository Settings → Pages
2. Set the source to "GitHub Actions"
3. The workflow will automatically deploy your changes
