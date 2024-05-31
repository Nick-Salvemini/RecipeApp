DROP DATABASE flavor_craft;
CREATE DATABASE flavor_craft;
\connect flavor_craft

\i flavor-craft-schema.sql
\i flavor-craft-seed.sql

DROP DATABASE flavor_craft_test;
CREATE DATABASE flavor_craft_test;
\connect flavor_craft_test

\i flavor-craft-schema.sql