package ru.devobserver.services;

import org.springframework.stereotype.Service;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.entities.DeviceMode;
import ru.devobserver.repositories.DeviceModeRepository;
import ru.devobserver.repositories.DeviceRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultDeviceService implements DeviceService {
    private final DeviceRepository deviceRepository;
    private final DeviceModeRepository deviceModeRepository;

    public DefaultDeviceService(
            final DeviceRepository deviceRepository,
            final DeviceModeRepository deviceModeRepository
    ) {
        this.deviceRepository = deviceRepository;
        this.deviceModeRepository = deviceModeRepository;
    }

    @Override
    public List<DeviceDTO> getDevices() {
        return deviceRepository.findAll().stream().map(DeviceDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<DeviceMode> getDeviceModes() {
        return deviceModeRepository.findAll();
    }
}
