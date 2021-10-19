package ru.devobserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.devobserver.domain.FirmwareQueueState;
import ru.devobserver.services.FirmwareService;
import ru.devobserver.services.exceptions.FirmwareServiceException;

@Controller
@RequestMapping("/firmware")
public class FirmwareController {

    private final FirmwareService firmwareService;

    @Autowired
    public FirmwareController(final FirmwareService firmwareService) {
        this.firmwareService = firmwareService;
    }

    @PostMapping(
            value = "/upload",
            produces = MediaType.TEXT_PLAIN_VALUE,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @ResponseBody
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(firmwareService.upload(file));
        } catch (FirmwareServiceException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/queueState")
    @ResponseBody
    public FirmwareQueueState getQueueState() {
        return firmwareService.getFirmwareQueueState();
    }
}
