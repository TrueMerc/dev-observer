package ru.devobserver.dto;

import ru.devobserver.domain.devices.uart.DeviceSettings;
import ru.devobserver.domain.devices.uart.LaboratoryStandSettings;

public class DeviceSettingsDTO {
    private final String port;
    private final int baudRate;
    private final int parity;
    private final int dataBits;
    private final int stopBits;

    public DeviceSettingsDTO(String port, int baudRate, int parity, int dataBits, int stopBits) {
        this.port = port;
        this.baudRate = baudRate;
        this.parity = parity;
        this.dataBits = dataBits;
        this.stopBits = stopBits;
    }

    public DeviceSettingsDTO(final LaboratoryStandSettings settings) {
        this.port = settings.getPort();
        this.baudRate = settings.getBaudRate();
        this.parity = settings.getParity().getCode();
        this.dataBits = settings.getDataBits();
        this.stopBits = settings.getStopBits().getCode();
    }

    public String getPort() {
        return port;
    }
    public int getBaudRate() {
        return baudRate;
    }

    public int getParity() {
        return parity;
    }

    public int getDataBits() {
        return dataBits;
    }

    public int getStopBits() {
        return stopBits;
    }
}
