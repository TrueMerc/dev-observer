package ru.devobserver.services;

import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.entities.DeviceMode;

import java.util.List;

public interface DeviceService {
    List<DeviceDTO> getDevices();

    List<DeviceMode> getDeviceModes();

    DeviceDTO updateDeviceMode(long deviceId, int deviceModeId);
}
