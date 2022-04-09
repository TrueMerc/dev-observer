package ru.devobserver.domain.uart;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fazecast.jSerialComm.SerialPort;

import java.util.List;

public enum Parity {
    NONE("None", SerialPort.NO_PARITY),
    ODD("Odd", SerialPort.ODD_PARITY),
    EVEN("Even", SerialPort.EVEN_PARITY),
    MARK("Mark", SerialPort.MARK_PARITY),
    SPACE("Space", SerialPort.SPACE_PARITY);

    private final String name;
    private final int code;

    Parity(String name, int code) {
        this.name = name;
        this.code = code;
    }

    Parity fromName(final String name) {
        return List.of(values()).stream()
                .filter(value -> value.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Can't find parity with name " + name));
    }

    Parity fromCode(final int code) {
        return List.of(values()).stream()
                .filter(value -> value.getCode() == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cant find parity with code " + code));
    }

    public String getName() {
        return name;
    }

    @JsonIgnore
    public int getCode() {
        return code;
    }
}
