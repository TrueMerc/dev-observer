INSERT INTO users(login, password, email, first_name, last_name, patronymic)
VALUES (
        'Admin',
        '$2a$10$D1dHMi5xlMDVp8K.yd0FGua2giccTHtfpxstZnmaRz.ZQYDENyDtm',
        'admin@sample.com',
        '',
        'Администратор системы',
        ''
        );

INSERT INTO roles(name, displayed_name)
VALUES ('ROLE_ADMIN', 'Администратор'), ('ROLE_STAFF', 'Сотрудник'), ('ROLE_USER', 'Пользователь');

INSERT INTO users_roles VALUES (1, 1);