DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    login VARCHAR (50) NOT NULL UNIQUE,
    password VARCHAR (80) NOT NULL,
    email VARCHAR (50),
    first_name VARCHAR (50),
    last_name VARCHAR (50),
    patronymic VARCHAR (50)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR (30) NOT NULL UNIQUE
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

DROP TABLE IF EXISTS users_roles;
CREATE TABLE users_roles (
                             user_id BIGINT,
                             role_id BIGINT,
                             PRIMARY KEY (user_id, role_id),
                             FOREIGN KEY(user_id) REFERENCES users(id),
                             FOREIGN KEY(role_id) REFERENCES roles(id)
);
