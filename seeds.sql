USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("German Shepherd", "Dogs", 400, 3),
("Plott Hound", "Dogs", 200, 7),
("Chocolate Lab", "Dogs", 300, 8),
("Gold Fish", "Fish", 2, 300),
("Clown Fish", "Fish", 5, 110),
("Tabby", "Cats", 50, 10),
("Calico", "Cats", 60, 5),
("Maine Coon", "Cats", 100, 2),
("Mutt", "Dogs", 85, 10),
("Shrimp", "Fish", 1, 600);

SELECT * FROM products;