// scripts/generateTestDbConfig.js
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Memuat environment variables dari .env

const projectRoot = process.cwd();
const configPath = path.resolve(projectRoot, "config", "database", "test.json");

console.log(configPath);

const configDir = path.dirname(configPath);
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

const dbConfig = {
  database: process.env.PGDATABASE_TEST,
  user: process.env.PGUSER_TEST,
  password: process.env.PGPASSWORD_TEST,
  host: process.env.PGHOST_TEST,
  port: process.env.PGPORT_TEST,
};

if (
  !dbConfig.database ||
  !dbConfig.user ||
  !dbConfig.password ||
  !dbConfig.host ||
  !dbConfig.port
) {
  console.error(
    "Error: One or more required database environment variables are missing (PGDATABASE_TEST/PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT)."
  );
  process.exit(1);
}

try {
  fs.writeFileSync(configPath, JSON.stringify(dbConfig, null, 2));
  console.log(`Successfully generated database config at: ${configPath}`);
} catch (error) {
  console.error(`Error writing config file: ${error.message}`);
  process.exit(1);
}
