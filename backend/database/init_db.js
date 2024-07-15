const { execSync } = require('child_process');
const path = require('path');

function initDatabase() {
    try {
        console.log("Starting Database Initialization...");

        execSync(`psql -c "DROP DATABASE IF EXISTS flavor_craft;"`);
        execSync(`psql -c "CREATE DATABASE flavor_craft;"`);
        execSync(`psql -c "DROP DATABASE IF EXISTS flavor_craft_test;"`);
        execSync(`psql -c "CREATE DATABASE flavor_craft_test;"`);

        const schemaFilePath = path.resolve(__dirname, 'flavor-craft-schema.sql');
        const seedFilePath = path.resolve(__dirname, 'flavor-craft-seed.js');

        execSync(`psql -d flavor_craft -f ${schemaFilePath}`);
        execSync(`node ${seedFilePath}`);

        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Failed to initialize database:", error);
        process.exit(1);
    }
}

initDatabase();