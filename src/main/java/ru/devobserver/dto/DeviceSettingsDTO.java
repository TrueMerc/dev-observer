package ru.devobserver.dto;

public class DeviceSettingsDTO {
    private final int baudRate;
    private final int parity;
    private final int dataBits;
    private final int stopBits;

    public DeviceSettingsDTO(int baudRate, int parity, int dataBits, int stopBits) {
        this.baudRate = baudRate;
        this.parity = parity;
        this.dataBits = dataBits;
        this.stopBits = stopBits;
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
