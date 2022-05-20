package ru.devobserver.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.devobserver.domain.devices.uart.DeviceSettings;
import ru.devobserver.domain.devices.uart.LaboratoryStandSettings;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.dto.DeviceSettingsDTO;
import ru.devobserver.entities.Device;
import ru.devobserver.entities.DeviceMode;
import ru.devobserver.entities.projections.DeviceSettingsProjection;
import ru.devobserver.exceptions.DeviceException;
import ru.devobserver.repositories.DeviceModeRepository;
import ru.devobserver.repositories.DeviceRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DefaultDeviceService implements DeviceService {

    private static final Logger logger = LoggerFactory.getLogger(DefaultDeviceService.class);

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
    public Optional<Device> getDevice(long deviceId) {
        return deviceRepository.findById(deviceId);
    }

    @Override
    public List<DeviceMode> getDeviceModes() {
        return deviceModeRepository.findAll();
    }

    @Override
    public DeviceDTO updateDeviceMode(final long deviceId, final int deviceModeId) {
        final Device device = deviceRepository
                .findById(deviceId)
                .orElseThrow(() -> new DeviceException("Can't find device with ID " + deviceId));
        final DeviceMode mode = deviceModeRepository
                .findById(deviceModeId)
                .orElseThrow(() -> new DeviceException("Can't find device mode with ID " + deviceId));
        device.setMode(mode);
        final Device updatedDevice = deviceRepository.save(device);
        return new DeviceDTO(updatedDevice);
    }

    @Override
    public void executeCommand(long deviceId, String command) {
        logger.debug("Try to execute command \"{}\" for device {}", command, deviceId);
        final Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new IllegalArgumentException("Can't find device with ID = " + deviceId));
        device.executeCommand(command);
    }

    @Override
    public DeviceSettingsDTO getDeviceSettings(long deviceId) {
        return new DeviceSettingsDTO(
                deviceRepository.findSettingsById(deviceId)
                        .map(DeviceSettingsProjection::getDeviceSettings)
                        .filter(LaboratoryStandSettings.class::isInstance)
                        .map(LaboratoryStandSettings.class::cast)
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Can't find appropriate settings for device with ID = " + deviceId
                                )
                        )
        );
    }

    @Override
    public DeviceSettingsDTO updateDeviceSettings(long deviceId, DeviceSettingsDTO deviceSettings) {
        final Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new IllegalArgumentException("Can't find device with ID = " + deviceId));
        device.setDeviceSettings(new LaboratoryStandSettings(deviceSettings));
        final DeviceSettings settings = deviceRepository.save(device).getDeviceSettings();
        if (settings instanceof LaboratoryStandSettings) {
            return new DeviceSettingsDTO((LaboratoryStandSettings) settings);
        } else {
            throw new IllegalArgumentException("Can't find appropriate settings for device with ID = " + deviceId);
        }
    }
}
