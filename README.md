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

## Managing Servers

**`docs/v0.1/servers/index.json` is the single source of truth.** All individual server files are generated from it.

### Adding or Updating Servers

1. Edit `docs/v0.1/servers/index.json` to add or update a server entry
2. Run the build script to generate individual server files:
   ```bash
   npm run build
   ```
3. Commit all changes (both `index.json` and generated files)

The build script will:
- Create/update version-specific files (e.g., `port-io/1.0.2.json`)
- Create/update `latest.json` for servers marked with `isLatest: true`
- Match entries to existing server directories automatically

### Adding a New Server

If adding a completely new server:
1. Manually create the directory: `docs/v0.1/servers/{serverName}/`
2. Add a placeholder version file (e.g., `1.0.0.json`)
3. Add the entry to `index.json`
4. Run `npm run build`

## Deployment

This repository uses GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

To enable GitHub Pages:
1. Go to repository Settings → Pages
2. Set the source to "GitHub Actions"
3. The workflow will automatically deploy your changes
