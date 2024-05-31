const { execSync } = require('child_process');
const {getDatabaseUri} = require('../config');

function initDatabase(){
    try{
        console.log("Starting Database Initialization...");
        execSync(`psql ${getDatabaseUri()} -f flavor-craft.sql`);
        console.log("Database initialized successfully");
    } catch (error){
        console.error("failed to initialize database:", error);
        process.exit(1);
    }
}

initDatabase();