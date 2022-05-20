CREATE TABLE IF NOT EXISTS device_modes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(255),
    is_firmware_uploading_enabled BOOLEAN,
    is_manual_control_enabled BOOLEAN
);

INSERT INTO device_modes(name, description, is_firmware_uploading_enabled, is_manual_control_enabled)
VALUES (
           'Автоматический',
           'В данном режиме разрешена загрузка прошивок и их выполнение в порядке поступления',
            true,
            false
       ),
       (
            'Ручное управление',
            'В данном режиме возможно управление устройством при помощи посылки команд. ' ||
            'Загрузка прошивок запрещена. Выполнение загруженных прошивок останавливается',
             false,
             true
       );