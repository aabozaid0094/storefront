CREATE TABLE orders (
	order_id serial PRIMARY KEY,
	user_id INT NOT NULL,
    order_status VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);