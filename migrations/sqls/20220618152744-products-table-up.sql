CREATE TABLE products (
	product_id serial PRIMARY KEY,
	product_name VARCHAR(255) NOT NULL,
    product_price NUMERIC(9, 2) NOT NULL,
    product_category VARCHAR(255) NULL
);