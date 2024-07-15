\connect postgres

-- Force disconnection of all other users
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'flavor_craft' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS flavor_craft;
CREATE DATABASE flavor_craft;
\connect flavor_craft

\i database/flavor-craft-schema.sql
\i database/flavor-craft-seed.sql

DROP DATABASE IF EXISTS flavor_craft_test;
CREATE DATABASE flavor_craft_test;
\connect flavor_craft_test

\i database/flavor-craft-schema.sql