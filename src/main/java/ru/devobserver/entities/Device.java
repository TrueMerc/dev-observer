package ru.devobserver.entities;

import com.fazecast.jSerialComm.SerialPort;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import ru.devobserver.domain.devices.uart.DeviceSettings;
import ru.devobserver.domain.devices.uart.LaboratoryStandSettings;

import javax.persistence.*;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

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

    public void executeCommand(final String commandName) {
        if (deviceSettings instanceof LaboratoryStandSettings) {
            final LaboratoryStandSettings settings = (LaboratoryStandSettings) deviceSettings;
            final SerialPort firstAvailablePort = SerialPort.getCommPort(settings.getPort());
            firstAvailablePort.setBaudRate(settings.getBaudRate());
            firstAvailablePort.setParity(settings.getParity().getCode());
            firstAvailablePort.setNumDataBits(settings.getDataBits());
            firstAvailablePort.setNumStopBits(settings.getStopBits().getCode());

            if (!firstAvailablePort.openPort()) {
                throw new RuntimeException("Can't open port " + firstAvailablePort.getDescriptivePortName());
            }

            try(final OutputStream outputStream = firstAvailablePort.getOutputStream()) {
                outputStream.write(commandName.getBytes(StandardCharsets.UTF_8));
            } catch (IOException e) {
                throw new RuntimeException(
                        "Can't write data into port " + firstAvailablePort.getDescriptivePortName(), e
                );
            } finally {
                firstAvailablePort.closePort();
            }
        } else {
            throw new IllegalStateException("Wrong device settings type " + deviceSettings.getClass().getSimpleName());
        }
    }
}
