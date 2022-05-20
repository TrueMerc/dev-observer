package ru.devobserver.services;

import com.fazecast.jSerialComm.SerialPort;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrimaryHardwareService implements HardwareService {

    @Override
    public List<String> getAvailableSerialPortNames() {
        return List.of(SerialPort.getCommPorts()).stream()
                .map(SerialPort::getSystemPortPath)
                .collect(Collectors.toList());
    }
}
