INSERT INTO users(login, password, email, first_name, last_name, patronymic)
VALUES (
        'Admin',
        '$2a$10$D1dHMi5xlMDVp8K.yd0FGua2giccTHtfpxstZnmaRz.ZQYDENyDtm',
        'admin@sample.com',
        '',
        'Администратор системы',
        ''
        );

INSERT INTO roles(name)
VALUES ('ROLE_ADMIN'), ('ROLE_STAFF'), ('ROLE_USER');

INSERT INTO users_roles VALUES (1, 1);