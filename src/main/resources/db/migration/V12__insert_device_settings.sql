UPDATE devices
SET settings =
        '{"type":"LaboratoryStandSettings","baudRate":9600,"parity":"NONE","dataBits":8,"stopBits":"ONE"}'::jsonb
WHERE ID = 1;