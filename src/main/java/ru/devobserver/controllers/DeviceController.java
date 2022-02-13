package ru.devobserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.services.DeviceService;

@Controller
@RequestMapping("api/devices")
public class DeviceController {

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
}
