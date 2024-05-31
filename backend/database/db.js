"use strict";
/** Database setup for flavor_craft. */
const { Client } = require("pg");
const { getDatabaseUri } = require("../config");

const db = new Client({
  connectionString: getDatabaseUri(),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
});

module.exports = {
  db,
  connect: () => db.connect(),
};