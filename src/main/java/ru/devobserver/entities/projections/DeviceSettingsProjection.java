package ru.devobserver.entities.projections;

import ru.devobserver.domain.devices.uart.DeviceSettings;

public interface DeviceSettingsProjection {
    DeviceSettings getDeviceSettings();
}
