package ru.devobserver.domain;

import lombok.Getter;

/**
 * Describes firmware execution queue state in a particular moment for a given user.
 */
@Getter
public class FirmwareQueueState {
    private final String activeFirmwareName;
    private final long size;
    private final long itemsBefore;
    private final boolean hasUnprocessedFirmware;

    public FirmwareQueueState(String activeFirmwareName, long size, long itemsBefore, boolean hasUnprocessedFirmware) {
        this.activeFirmwareName = activeFirmwareName;
        this.size = size;
        this.itemsBefore = itemsBefore;
        this.hasUnprocessedFirmware = hasUnprocessedFirmware;
    }
}
