--@block
CREATE TABLE IF NOT EXISTS carts( 
        user_id VARCHAR(500) NOT NULL,
        product_id VARCHAR(200), 
        cart_id VARCHAR(100) PRIMARY KEY NOT NULL, 
        quantity INT NOT NULL,
        color VARCHAR(100) NOT NULL,
        size VARCHAR(50) NOT NULL,
        delivery INT NOT NULL,
        CONSTRAINT fk_product
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

--@block
DROP TABLE carts;

--@block
INSERT INTO carts(product_id, user_id, quantity, color, size) VALUES('${data.product_id}', '${data.user_id}', 12, '${data.color}', '${data.size}')

--@block 
SELECT * FROM carts

--@block
DELETE FROM carts WHERE cart_id=3;

---@block
SELECT * FROM carts WHERE user_id='284979374681227781'


--@block
SELECT * FROM carts LEFT JOIN products ON carts.product_id=products.product_id  WHERE user_id='284979374681227781' ORDER BY store 

--@block
SELECT store FROM carts LEFT JOIN products ON carts.product_id=products.product_id GROUP BY store

--@BLOCK
select * FROM products