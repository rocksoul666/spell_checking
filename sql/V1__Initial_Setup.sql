CREATE TABLE requests (
       id SERIAL PRIMARY KEY,
       word VARCHAR(50) NOT NULL,
       response VARCHAR(50) NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW()
   );