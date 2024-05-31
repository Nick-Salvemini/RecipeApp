"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
if (!SECRET_KEY) {
  console.error("Missing mandatory environment variable: SECRET_KEY".red);
  process.exit(1);
}

const PORT = +process.env.PORT || 3000;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "flavor_craft_test"
    : process.env.DATABASE_URL || "flavor_craft";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Missing mandatory environment variable: OPENAI_API_KEY".red);
  process.exit(1);
}

console.log("FlavorCraft Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("OpenAI API Key:".yellow, OPENAI_API_KEY);
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  OPENAI_API_KEY
};