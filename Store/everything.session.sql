
--@block
CREATE TABLE IF NOT EXISTS Stores(
    store_id VARCHAR(500) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    picture VARCHAR(500)
);

--@block
INSERT INTO Stores(store_id, name, picture)
VALUES('1293849','unengineered', 'https://somerandomurl.com');