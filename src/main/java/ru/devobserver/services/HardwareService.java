package ru.devobserver.services;

import java.util.List;

public interface HardwareService {
    List<String> getAvailableSerialPortNames();
}
