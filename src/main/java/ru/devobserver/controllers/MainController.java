package ru.devobserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.domain.ApplicationEntities;
import ru.devobserver.domain.ApplicationSettings;
import ru.devobserver.services.ApplicationEntityService;

@Controller
public class MainController {

    private final ApplicationProperties applicationProperties;
    private final ApplicationEntityService applicationEntityService;

    @Autowired
    public MainController(
            final ApplicationProperties applicationProperties,
            final ApplicationEntityService applicationEntityService) {
        this.applicationProperties = applicationProperties;
        this.applicationEntityService = applicationEntityService;
    }

    @GetMapping("/")
    public String showMainPage() {
        return "index";
    }

    @GetMapping("/description")
    public String redirectToMainPage() {
        return "index";
    }

    @GetMapping(value = "/settings")
    @ResponseBody
    public ApplicationSettings getWebSettings() {
        final ApplicationEntities applicationEntities = applicationEntityService.getApplicationEntities();
        return new ApplicationSettings(applicationProperties, applicationEntities);
    }
}