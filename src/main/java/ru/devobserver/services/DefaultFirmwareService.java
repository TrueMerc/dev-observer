package ru.devobserver.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.services.exceptions.FirmwareServiceException;

import java.io.IOException;
import java.nio.file.Path;

@Service
public class DefaultFirmwareService implements FirmwareService {

    private final ApplicationProperties applicationProperties;

    @Autowired
    public DefaultFirmwareService(final ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Override
    public void upload(MultipartFile file) {
        try {
            final String firmwareFolderName = applicationProperties.getFirmwareFolder();
            final Path path = Path.of(firmwareFolderName, file.getOriginalFilename());
            file.transferTo(Path.of(firmwareFolderName, file.getOriginalFilename()));
        } catch (IOException e) {
            throw new FirmwareServiceException("Can't save uploaded file", e);
        }
    }
}
