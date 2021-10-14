DROP TABLE IF EXISTS firmware_processing_status;
CREATE TABLE IF NOT EXISTS firmware_processing_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    displayed_name VARCHAR(50),
    description VARCHAR(255)
);

INSERT INTO firmware_processing_status (name, displayed_name, description)
VALUES
       ('WAITING', 'Ожидает выполнения', 'Прошивка находится в очереди в ожидании выполнения'),
       ('IN_PROGRESS', 'Выполняется', 'Прошивка загружена на устройство и выполняется'),
       ('PROCESSED', 'Выполнение завершено', 'Выполнение прошивки устройством завершено');

DROP TABLE IF EXISTS firmware_queue;
CREATE TABLE IF NOT EXISTS firmware_queue (
    id BIGSERIAL PRIMARY KEY,
    firmware_id BIGINT NOT NULL,
    status INT NOT NULL DEFAULT 1,

    FOREIGN KEY (firmware_id) REFERENCES firmware_files(id),
    FOREIGN KEY (status) REFERENCES firmware_processing_status(id)
);