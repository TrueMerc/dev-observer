package ru.devobserver.services;

import org.springframework.web.multipart.MultipartFile;

public interface FirmwareService {
    void upload(MultipartFile file);
}
