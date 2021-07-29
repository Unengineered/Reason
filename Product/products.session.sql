--@block
CREATE TABLE IF NOT EXISTS products( 
        product_id VARCHAR(200) PRIMARY KEY, 
        price INT NOT NULL, 
        thumbnail VARCHAR(300) NOT NULL,
        name VARCHAR(100) NOT NULL,
        background VARCHAR(50) NOT NULL,
        store VARCHAR(255) NOT NULL
        );

--@block
DROP TABLE products;

--@block
INSERT INTO carts(cart_id, product_id, picture)
VALUES('1293849','unengineered', 'https://somerandomurl.com');

--@block CREATE
SELECT * FROM products

--@block
UPDATE products 
SET 
  price = 300,
  background = '4A4A4A',
  store = 'Test3',
  thumbnail = 'https://firebasestorage.googleapis.com/v0/b/everything-25.appspot.com/o/products%2Fmixtapes%2Fopinions.png?alt=media&token=1553487d-e9c3-46a6-bfc7-32b706b7bda9' 
WHERE 
  product_id = '6101689eda829e0bd4867233';

--@block
UPDATE products
SET
  price = 300,
  thumbnail = 'https://firebasestorage.googleapis.com/v0/b/everything-25.appspot.com/o/products%2Fmixtapes%2Fopinions.png?alt=media&token=1553487d-e9c3-46a6-bfc7-32b706b7bda9', 
  background = '4A4A4A',
  store = 'Test4'
WHERE 
  product_id = '6101689eda829e0bd4867233';