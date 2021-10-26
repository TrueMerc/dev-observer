package ru.devobserver.services;

import org.springframework.web.multipart.MultipartFile;
import ru.devobserver.domain.FirmwareQueueState;

public interface FirmwareService {
    /**
     * Uploads file to server's drive and returns name that is automatically assigned to file.
     * @param file uploaded file.
     * @return Name that is automatically assigned to file.
     */
    String upload(MultipartFile file);

    FirmwareQueueState getFirmwareQueueState();

    void executeNextFirmware();
}
