ALTER TABLE firmware_files DROP COLUMN IF EXISTS size;
ALTER TABLE firmware_files ADD COLUMN size BIGINT;
