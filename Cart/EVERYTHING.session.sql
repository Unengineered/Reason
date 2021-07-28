--@block
CREATE TABLE IF NOT EXISTS carts( 
        user_id VARCHAR(500) NOT NULL,
        product_id VARCHAR(200), 
        cart_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
        quantity INT NOT NULL,
        color VARCHAR(100) NOT NULL,
        size VARCHAR(50) NOT NULL,
        CONSTRAINT fk_product
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

--@block
DROP TABLE carts;

--@block
INSERT INTO carts(product_id, user_id, quantity, color, size) VALUES('${data.product_id}', '${data.user_id}', 12, '${data.color}', '${data.size}')