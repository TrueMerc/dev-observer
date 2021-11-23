package ru.devobserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.dto.LaboratoryDTO;
import ru.devobserver.services.LaboratoryService;

@Controller
@RequestMapping("/api/labs")
final public class LaboratoryController {

    private final LaboratoryService laboratoryService;

    @Autowired
    public LaboratoryController(final LaboratoryService laboratoryService) {
        this.laboratoryService = laboratoryService;
    }

    @GetMapping("/{labId}")
    @ResponseBody
    public LaboratoryDTO getLaboratory(@PathVariable("labId") long laboratoryId) {
        return new LaboratoryDTO(laboratoryService.findById(laboratoryId));
    }

    @GetMapping(value = "/download/{labId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public FileSystemResource downloadFile(@PathVariable("labId") String laboratoryId) {
        return laboratoryService.fileResourceById(Long.valueOf(laboratoryId));
    }
}
