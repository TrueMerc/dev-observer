package ru.devobserver.services;

import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.dto.DeviceSettingsDTO;
import ru.devobserver.entities.Device;
import ru.devobserver.entities.DeviceMode;

import java.util.List;
import java.util.Optional;

public interface DeviceService {
    List<DeviceDTO> getDevices();

    Optional<Device> getDevice(long deviceId);

    List<DeviceMode> getDeviceModes();

    DeviceDTO updateDeviceMode(long deviceId, int deviceModeId);

    void executeCommand(long deviceId, String command);

    DeviceSettingsDTO getDeviceSettings(long deviceId);

    DeviceSettingsDTO updateDeviceSettings(long deviceId, DeviceSettingsDTO deviceSettings);
}
