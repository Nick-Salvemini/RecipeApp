// const { execSync } = require('child_process');
// const { getDatabaseUri } = require('../config');

// function initDatabase() {
//     try {
//         console.log("Starting Database Initialization...");
//         execSync(`psql ${getDatabaseUri()} -f database/flavor-craft.sql`);
//         console.log("Database initialized successfully");
//     } catch (error) {
//         console.error("Failed to initialize database:", error);
//         process.exit(1);
//     }
// }

// initDatabase();

const { execSync } = require('child_process');
const { getDatabaseUri } = require('../config');
const path = require('path');

function initDatabase() {
    try {
        console.log("Starting Database Initialization...");
        const sqlFilePath = path.resolve(__dirname, 'flavor-craft.sql');
        execSync(`psql ${getDatabaseUri()} -f ${sqlFilePath}`);
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Failed to initialize database:", error);
        process.exit(1);
    }
}

initDatabase();