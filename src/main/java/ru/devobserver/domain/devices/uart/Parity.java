package ru.devobserver.domain.devices.uart;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fazecast.jSerialComm.SerialPort;

import java.util.List;

public enum Parity {
    NONE(SerialPort.NO_PARITY),
    ODD(SerialPort.ODD_PARITY),
    EVEN(SerialPort.EVEN_PARITY),
    MARK(SerialPort.MARK_PARITY),
    SPACE(SerialPort.SPACE_PARITY);

    private final int code;

    Parity(final int code) {
        this.code = code;
    }

    Parity fromName(final String name) {
        return List.of(values()).stream()
                .filter(value -> value.name().equals(name))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Can't find parity with name " + name));
    }

    Parity fromCode(final int code) {
        return List.of(values()).stream()
                .filter(value -> value.getCode() == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cant find parity with code " + code));
    }

    @JsonIgnore
    public int getCode() {
        return code;
    }
}
