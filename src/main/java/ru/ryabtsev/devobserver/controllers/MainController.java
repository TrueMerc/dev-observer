package ru.ryabtsev.devobserver.controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.net.MalformedURLException;

@Controller
public class MainController {

    private static final String VIDEO_SOURCE = "/media/ryabtsev/Data/Video/FILE0161.MOV";

    @GetMapping("/")
    public String showMainPage() {
        return "index";
    }

//    @GetMapping("/stream")
//    public ResponseEntity<UrlResource> stream() {
//        try {
//            var stream = new UrlResource(VIDEO_SOURCE);
//            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
//                    .contentType(
//                            MediaTypeFactory.getMediaType(stream).orElse(MediaType.APPLICATION_OCTET_STREAM)
//                    )
//                    .body(stream);
//
//        } catch (MalformedURLException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).build();
//        }
//    }

    @GetMapping(value = "/stream", produces = "video/mp4")
    @ResponseBody
    public FileSystemResource stream() {
        return new FileSystemResource(new File(VIDEO_SOURCE));
    }
}
