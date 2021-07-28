--@block
CREATE TABLE IF NOT EXISTS products( 
        product_id VARCHAR(200) PRIMARY KEY, 
        price INT NOT NULL, 
        picture VARCHAR(300) NOT NULL,
        name VARCHAR(100) NOT NULL,
        background VARCHAR(50) NOT NULL,
        store_name VARCHAR(255) NOT NULL
        );

--@block
DROP TABLE carts;

--@block
INSERT INTO carts(cart_id, product_id, picture)
VALUES('1293849','unengineered', 'https://somerandomurl.com');