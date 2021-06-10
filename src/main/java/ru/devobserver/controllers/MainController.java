package ru.devobserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.entities.WebSettings;

@Controller
public class MainController {

    private final ApplicationProperties applicationProperties;

    @Autowired
    public MainController(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @GetMapping("/")
    public String showMainPage() {
        return "index";
    }

    @GetMapping(value = "/settings")
    @ResponseBody
    public WebSettings getWebSettings() {
        return new WebSettings(
                applicationProperties.getVideoStreamUrl(),
                applicationProperties.getFirmwareControllerUrl()
        );
    }
}