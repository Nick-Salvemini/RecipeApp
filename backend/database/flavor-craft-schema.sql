DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1)
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  prep_cook_time VARCHAR(50) NOT NULL,
  cuisine_type VARCHAR(50) NOT NULL,
  ingredients TEXT[] NOT NULL,
  steps TEXT[] NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
); 