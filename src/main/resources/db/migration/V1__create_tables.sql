DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    login VARCHAR (50) NOT NULL UNIQUE,
    password VARCHAR (80) NOT NULL,
    email VARCHAR (50),
    name VARCHAR (50),
    surname VARCHAR (50),
    patronymic VARCHAR (50),
    role VARCHAR(50)
);

DROP TABLE IF EXISTS firmware_files;
CREATE TABLE firmware_files (
    id BIGSERIAL PRIMARY KEY,
    original_name VARCHAR (100),
    name VARCHAR (50),
    author_id BIGINT,
    size INTEGER,
    path VARCHAR (300)
);