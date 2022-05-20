package ru.devobserver.domain.devices.uart;

import ru.devobserver.dto.DeviceSettingsDTO;

public class LaboratoryStandSettings implements DeviceSettings {

    private final String port;
    private final int baudRate;
    private final Parity parity;
    private final int dataBits;
    private final StopBits stopBits;


    public LaboratoryStandSettings(String port, int baudRate, Parity parity, int dataBits, StopBits stopBits) {
        this.port = port;
        this.baudRate = baudRate;
        this.parity = parity;
        this.dataBits = dataBits;
        this.stopBits = stopBits;
    }

    public LaboratoryStandSettings(DeviceSettingsDTO deviceSettingsDTO) {
        this(
                deviceSettingsDTO.getPort(),
                deviceSettingsDTO.getBaudRate(),
                Parity.fromCode(deviceSettingsDTO.getParity()),
                deviceSettingsDTO.getDataBits(),
                StopBits.fromCode(deviceSettingsDTO.getStopBits())
        );
    }

    public int getBaudRate() {
        return baudRate;
    }

    public Parity getParity() {
        return parity;
    }

    public int getDataBits() {
        return dataBits;
    }

    public StopBits getStopBits() {
        return stopBits;
    }

    public String getPort() {
        return port;
    }
}
