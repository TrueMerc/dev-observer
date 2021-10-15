package ru.devobserver.services;

import org.springframework.web.multipart.MultipartFile;
import ru.devobserver.domain.FirmwareQueueState;

public interface FirmwareService {
    void upload(MultipartFile file);

    FirmwareQueueState getFirmwareQueueState();
}
