CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(50) DEFAULT 'Anonymous',
       created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE requests
ADD COLUMN user_id INTEGER,
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) 
REFERENCES users (id);