INSERT INTO laboratories(name, goal, description, materials_file_name, materials_displayed_file_name)
VALUES (
           'Использование сдвиговых регистров для программирования светодиодной матрицы',
           'Изучение принципа работы сдвигового регистра 74HC595D и светодиодной матрицы. Создание пользовательских типов VHDL.',
           '{"executionOrder" : [
             "Скачайте с сайта УЛС-2021 комплект учебно-методических материалов, необходимых для выполнения лабораторной работы.",
             "Скопируйте папку ULS_LAB3_shift_reg (из комплекта материалов) в рабочий каталог. Путь к каталогу не должен содержать русских символов.",
             "Создайте проект shift_reg в папке ULS_LAB3_shift_reg при помощи системы автоматизированного проектирования Xilinx ISE Web Pack.",
             "Из папки ULS_LAB3_shift_reg добавьте в проект модули: UART_RX.vhd, top.vhd и counter.vhd.",
             "Из папки ULS_LAB3_shift_reg добавьте в проект модули: UART_RX.vhd, top.vhd и counter.vhd.",
             "Создайте пакет Common.vhd и добавьте в него пользовательские типы PICTURE и PICTURE_array. Объявите этот пакет в файле верхнего уровня при помощи строки use work.Common.all;",
             "Создайте модуль matrix_decoder и опишите в нём загрузку данных в сдвиговые регистры и вывод данных на светодиодную матрицу при появлении сигнала защёлки.",
             "Добавьте в файл верхнего уровня таблицы Content1 – 3, заданные пользовательским типом PICTURE, согласно выданному варианту.",
             "Создайте файл связи с выводами отладочной платы, который должен соответствовать вашему варианту (Implementation Constraints File).",
             "Исследуйте временные диаграммы для полученного программного кода при помощи симулятора ISim.",
             "Скомпилируйте проект и загрузите файл с расширением *.bit на сайт УЛС-2021 (лабораторная работа №3) для проверки его работоспособности.",
             "Убедитесь, что полученный результат соответствует заданному варианту.",
             "Сохраните полученный код программы и сделайте фотоотчет работы проекта на лабораторном стенде для составления отчета."
           ]}',
           'laboratory_0_3.zip',
           'Лабораторная работа 3.zip'
       ),
       (
           'Последовательный периферийный интерфейс SPI',
           'Изучение организации приёма и передачи информации по последовательному каналу SPI (Serial Peripheral Interface) и рассмотрение устройства и принципа работы flash-памяти.',
           '{"executionOrder" : [
             "Скачайте с сайта УЛС-2021 комплект учебно-методических материалов, необходимых для выполнения лабораторной работы. ",
             "Скопируйте папку ULS_LAB4_SPI_flash (из комплекта материалов) в рабочий каталог. Путь к каталогу не должен содержать русских символов.",
             "Создайте проект spi_flash в папке ULS_LAB4_SPI_flash при помощи системы автоматизированного проектирования Xilinx ISE Web Pack. ",
             "Из папки ULS_LAB4_SPI_flash добавьте в проект модули:\nUART_RX.vhd, UART_TX.vhd, SPI_Master.vhd, SPI_Master_With_Single_CS.vhd и top.vhd.",
             "Создайте testbench SPI_Master_With_Single__CS_TB, который должен задать входные воздействия для модуля SPI_Master_With_Single_CS. Сохраните временные диаграммы в отчёт.",
             "В файле верхнего уровня top найдите объявление констант opc_WR и opc_RE и задайте их состояние в соответствие с выданным вариантом.",
             "В файле верхнего уровня top создайте процесс state_machine_uart_RX, преобразующий входной вектор с данными от приемника UART в управляющие команды для работы с процессом интерфейса SPI.",
             "В файле верхнего уровня top создайте процесс state_machine_SPI, который в зависимости от управляющих команд ID, WR и RE будет подавать через интерфейс SPI коды операций для взаимодействия с flash-памятью.",
             "В файле верхнего уровня top создайте процесс state_machine_uart_TX, преобразующий коды операций от flash-памяти в сообщение, отправляемое передатчиком UART, согласно выданному варианту.",
             "Создайте файл связи с выводами отладочной платы, который должен соответствовать вашему варианту (Implementation Constraints File).",
             "Скомпилируйте проект и загрузите файл с расширением *.bit на сайт УЛС-2021 (лабораторная работа №4) для проверки его работоспособности.",
             "Убедитесь, что полученный результат соответствует заданному варианту.",
             "Сохраните полученный код программы и сделайте фотоотчет работы проекта на лабораторном стенде для составления отчета."
           ]}',
           'laboratory_0_1.zip',
           'Лабораторная работа 1.zip'
       );
