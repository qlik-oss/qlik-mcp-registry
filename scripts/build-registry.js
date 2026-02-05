#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const INDEX_FILE = path.join(__dirname, "../docs/v0.1/servers/index.json");
const SERVERS_DIR = path.join(__dirname, "../docs/v0.1/servers");

function deleteDirectories() {
  const entries = fs.readdirSync(SERVERS_DIR);
  for (const entry of entries) {
    const fullPath = path.join(SERVERS_DIR, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`🗑️  Deleted ${entry}/`);
    }
  }
}

function main() {
  console.log("Building registry from index.json...\n");

  // Delete all existing server directories
  deleteDirectories();
  console.log();

  // Read index.json
  const indexData = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));

  // Process each server entry
  for (const entry of indexData.servers) {
    const slug = entry._meta["io.modelcontextprotocol.registry/official"]?.slug;
    const version = entry.server.version;
    const isLatest =
      entry._meta["io.modelcontextprotocol.registry/official"]?.isLatest;

    if (!slug) {
      console.warn(`⚠️  No slug found for ${entry.server.name}, skipping...`);
      continue;
    }

    const serverPath = path.join(SERVERS_DIR, slug);

    // Create directory
    fs.mkdirSync(serverPath, { recursive: true });

    // Write version file
    const versionFile = path.join(serverPath, `${version}.json`);
    fs.writeFileSync(versionFile, JSON.stringify(entry, null, 2) + "\n");
    console.log(`✓ ${slug}/${version}.json`);

    // Write latest.json if this is the latest version
    if (isLatest) {
      const latestFile = path.join(serverPath, "latest.json");
      fs.writeFileSync(latestFile, JSON.stringify(entry, null, 2) + "\n");
      console.log(`✓ ${slug}/latest.json`);
    }
  }

  console.log("\n✅ Registry build complete!");
}

main();
