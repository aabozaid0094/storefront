CREATE TABLE users (
	user_id serial PRIMARY KEY,
	user_email VARCHAR(255) UNIQUE NOT NULL,
	user_first_name VARCHAR(255) NOT NULL,
	user_last_name VARCHAR(255) NOT NULL,
	user_password_hash VARCHAR(255) NOT NULL
);