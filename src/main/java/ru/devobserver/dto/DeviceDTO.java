package ru.devobserver.dto;

import lombok.Getter;
import org.hibernate.Hibernate;
import ru.devobserver.entities.Device;

// TODO Make description and other properties (like an image) as loadable part at front end.
@Getter
public class DeviceDTO {
    private final Long id;
    private final String name;
    private final String description;
    private final Integer modeId;

    public DeviceDTO(final Device device) {
        this.id = device.getId();
        this.name = device.getName();
        this.description = device.getDescription();
        Hibernate.initialize(device);
        this.modeId = device.getMode().getId();
    }

    public DeviceDTO(Long id, String name, String description, Integer modeId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.modeId = modeId;
    }
}
