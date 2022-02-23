package ru.devobserver.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.services.DeviceService;

@Controller
@RequestMapping("api/devices")
public class DeviceController {

    private static final Logger logger = LoggerFactory.getLogger(DeviceController.class);

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PutMapping("/updateDeviceMode/{deviceId}/{deviceModeId}")
    @ResponseBody
    public DeviceDTO updateDeviceMode(
            @PathVariable("deviceId") final long deviceId,
            @PathVariable("deviceModeId") final int deviceModeId
    ) {
        return deviceService.updateDeviceMode(deviceId, deviceModeId);
    }

    @GetMapping("/sendCommandToDevice/{deviceId}/{command}")
    @ResponseBody
    public String sendCommandToDevice(
            @PathVariable("deviceId") final long deviceId,
            @PathVariable("command") final String command
    ) {
        logger.debug("Command is received: deviceId = {}, command = {}", deviceId, command);
        return "OK";
    }
}
