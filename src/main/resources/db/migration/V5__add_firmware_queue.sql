DROP TABLE IF EXISTS firmware_status_description;
CREATE TABLE IF NOT EXISTS firmware_status_description (
    id SMALLSERIAL PRIMARY KEY,
    brief VARCHAR(50),
    "full" VARCHAR(255)
);

INSERT INTO firmware_status_description (brief, "full")
VALUES
       ('Ожидает выполнения', 'Прошивка находится в очереди в ожидании выполнения'),
       ('Выполняется', 'Прошивка загружена на устройство и выполняется'),
       ('Выполнение завершено', 'Выполнение прошивки устройством завершено');

DROP TABLE IF EXISTS firmware_queue;
CREATE TABLE IF NOT EXISTS firmware_queue (
    id BIGSERIAL PRIMARY KEY,
    firmware_id BIGINT NOT NULL,
    status SMALLINT NOT NULL DEFAULT 1,
    execution_code SMALLINT,

    FOREIGN KEY (firmware_id) REFERENCES firmware_files(id),
    FOREIGN KEY (status) REFERENCES firmware_status_description(id)
);