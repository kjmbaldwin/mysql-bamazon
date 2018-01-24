DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id integer auto_increment not null,
    product_name VARCHAR(100) not null,
    department_name VARCHAR(100),
    price integer not null,
    stock_quantity integer not null,
    primary key(item_id)
);

