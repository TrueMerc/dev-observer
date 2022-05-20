package ru.devobserver.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "device_modes")
@Getter
@Setter
public class DeviceMode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_firmware_uploading_enabled")
    private boolean isFirmwareUploadingEnabled;

    @Column(name = "is_manual_control_enabled")
    private boolean isManualControlEnabled;
}
