CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
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
  ingredients TEXT,
  steps TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);