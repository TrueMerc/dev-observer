package ru.devobserver.domain;

import java.util.stream.Stream;

public enum FirmwareStatus {
    UNDEFINED((short)0),
    WAITING((short)1),
    ACTIVE((short)2),
    PROCESSED((short)3);

    private final short value;

    FirmwareStatus(short value) {
        this.value = value;
    }

    public static FirmwareStatus of(final short value) {
        return Stream.of(FirmwareStatus.values())
                .filter(status -> status.toShort() == value)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(formExceptionMessage(value)));
    }

    public short toShort() {
        return value;
    }

    private static String formExceptionMessage(short code) {
        return String.format("Firmware status with code %d doesn't exist.", code);
    }
}
