package ru.devobserver.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.domain.FirmwareQueueState;
import ru.devobserver.domain.FirmwareStatus;
import ru.devobserver.entities.Firmware;
import ru.devobserver.entities.FirmwareQueueItem;
import ru.devobserver.entities.User;
import ru.devobserver.repositories.FirmwareQueue;
import ru.devobserver.repositories.FirmwareRepository;
import ru.devobserver.services.exceptions.FirmwareServiceException;

import java.io.IOException;
import java.nio.file.Path;

@Service
public class DefaultFirmwareService implements FirmwareService {

    private final ApplicationProperties applicationProperties;
    private final UserService userService;
    private final FirmwareRepository firmwareRepository;
    private final FirmwareQueue firmwareQueue;

    @Autowired
    public DefaultFirmwareService(
            final ApplicationProperties applicationProperties,
            final UserService userService,
            final FirmwareRepository firmwareRepository,
            final FirmwareQueue firmwareQueue
    ) {
        this.applicationProperties = applicationProperties;
        this.userService = userService;
        this.firmwareRepository = firmwareRepository;
        this.firmwareQueue = firmwareQueue;
    }

    @Override
    @Transactional
    public void upload(MultipartFile file) {
        try {
            final String firmwareFolderName = applicationProperties.getFirmwareFolder();
            final User currentUser = userService.currentUser();
            final long currentUserFirmwareCount = firmwareRepository.countAllByAuthor(currentUser);
            final String fileName = getFirmwareFileName(currentUser, currentUserFirmwareCount);
            final Path path = Path.of(firmwareFolderName, fileName);
            file.transferTo(path);
            final Firmware firmware = new Firmware();
            firmware.setOriginalName(file.getOriginalFilename());
            firmware.setName(fileName);
            firmware.setPath(firmwareFolderName);
            firmware.setSize(file.getSize());
            firmware.setAuthor(currentUser);
            final Firmware registeredFirmware = firmwareRepository.save(firmware);
            firmwareQueue.save(new FirmwareQueueItem(registeredFirmware));
        } catch (IOException e) {
            throw new FirmwareServiceException("Can't save uploaded file", e);
        }
    }

    private String getFirmwareFileName(final User user, final long userFirmwareCount) {
        return String.format("firmware_%d_%d.bit", user.getId(), userFirmwareCount + 1);
    }

    @Override
    @Transactional
    public FirmwareQueueState getFirmwareQueueState() {
        final User currentUser = userService.currentUser();
        final long queueSize = firmwareQueue.countAllByStatusNot(FirmwareStatus.PROCESSED);
        final String activeFirmwareName = firmwareRepository
                .findByStatus(FirmwareStatus.ACTIVE)
                .map(Firmware::getName)
                .orElse("");
        final long itemsBeforeFirstUserFirmware = firmwareQueue.itemsBeforeUserFirstFirmware(currentUser.getId());
        final boolean hasUnprocessedFirmware = firmwareRepository.existsByAuthorAndStatusNot(
                currentUser, FirmwareStatus.PROCESSED
        );
        return new FirmwareQueueState(
                activeFirmwareName, queueSize, itemsBeforeFirstUserFirmware, hasUnprocessedFirmware
        );
    }

    @Override
    @Async
    @Scheduled(fixedDelay = 15000)
    public void executeNextFirmware() {
        firmwareQueue.findFirstByStatusOrderById(FirmwareStatus.WAITING).ifPresent(firmwareQueueItem -> {
            firmwareQueueItem.setStatus(FirmwareStatus.ACTIVE);
            firmwareQueue.save(firmwareQueueItem);
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            firmwareQueueItem.setStatus(FirmwareStatus.PROCESSED);
            firmwareQueue.save(firmwareQueueItem);
        });
    }
}
