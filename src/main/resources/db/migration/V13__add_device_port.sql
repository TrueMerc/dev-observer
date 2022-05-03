WITH variables (jsonString) as (
    values (
            '{"type":"LaboratoryStandSettings","port":"/dev/ttyUSB0",' ||
            '"baudRate":9600,"parity":"NONE","dataBits":8,"stopBits":"ONE"}'
    )
)
UPDATE devices
SET settings = variables.jsonString::jsonb
FROM variables
WHERE ID = 1;