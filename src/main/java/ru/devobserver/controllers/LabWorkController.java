package ru.devobserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.configurations.ApplicationProperties;

@Controller
@RequestMapping("/labWorks")
final public class LabWorkController {

    private final ApplicationProperties applicationProperties;

    @Autowired
    public LabWorkController(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @GetMapping(value = "/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public FileSystemResource downloadFile() {
        final String filePath = applicationProperties.getLabWorksFolder() + "/" + "Документы - Рябцев.zip";
        return new FileSystemResource(filePath);
    }
}
