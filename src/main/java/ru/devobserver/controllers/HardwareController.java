package ru.devobserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.services.HardwareService;

import java.util.List;

@Controller
@RequestMapping("api/hardware")
public class HardwareController {

    private final HardwareService hardwareService;

    public HardwareController(final HardwareService hardwareService) {
        this.hardwareService = hardwareService;
    }

    @GetMapping("getAvailableSerialPortNames")
    @ResponseBody
    public List<String> getAvailableSerialPortNames() {
        return hardwareService.getAvailableSerialPortNames();
    }
}
