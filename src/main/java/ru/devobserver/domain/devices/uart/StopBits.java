package ru.devobserver.domain.devices.uart;

import com.fazecast.jSerialComm.SerialPort;

import java.util.List;

public enum StopBits {
    ONE(SerialPort.ONE_STOP_BIT),
    ONE_POINT_FIVE(SerialPort.ONE_POINT_FIVE_STOP_BITS),
    TWO(SerialPort.TWO_STOP_BITS);

    private final int code;

    StopBits(int code) {
        this.code = code;
    }

    public static StopBits fromCode(final int code) {
        return List.of(values()).stream()
                .filter(value -> value.getCode() == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Can't find stop bits for code " + code));
    }

    public int getCode() {
        return code;
    }
}
