package ru.devobserver.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.dto.DeviceSettingsDTO;
import ru.devobserver.services.DeviceService;

import javax.ws.rs.core.MediaType;

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

    @PostMapping("/sendCommandToDevice/{deviceId}/{command}")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public String sendCommandToDevice(
            @PathVariable("deviceId") final long deviceId,
            @PathVariable("command") final String command
    ) {
        logger.debug("Command is received: deviceId = {}, command = {}", deviceId, command);
        return "OK";
    }

    @PostMapping(value = "/changeDeviceSettings/{deviceId}", consumes = MediaType.APPLICATION_JSON)
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public String changeDeviceSettings(
            @PathVariable("deviceId") final int deviceId,
            @RequestBody final DeviceSettingsDTO deviceSettings
    ) {
        logger.debug("Device settings is received: deviceId = {}, settings = {}", deviceId, deviceSettings);
        return "OK";
    }
}
