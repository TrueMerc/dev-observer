package ru.devobserver.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import ru.devobserver.domain.devices.uart.DeviceSettings;

import javax.persistence.*;

@Entity
@Table(name = "devices")
@Getter
@Setter
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "settings", columnDefinition = "jsonb")
    @Type(type = "jsonb")
    private DeviceSettings deviceSettings;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mode")
    private DeviceMode mode;
}
