package ru.devobserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.domain.ApplicationSettings;
import ru.devobserver.dto.RoleDTO;
import ru.devobserver.entities.projections.LaboratoryIdentifierAndName;
import ru.devobserver.services.LaboratoryService;
import ru.devobserver.services.RoleService;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class MainController {

    private final ApplicationProperties applicationProperties;
    private final RoleService roleService;
    private final LaboratoryService laboratoryService;

    @Autowired
    public MainController(
            final ApplicationProperties applicationProperties,
            final RoleService roleService,
            final LaboratoryService laboratoryService
    ) {
        this.applicationProperties = applicationProperties;
        this.roleService = roleService;
        this.laboratoryService = laboratoryService;
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
        final List<RoleDTO> roles = roleService.findAll().stream().map(RoleDTO::new).collect(Collectors.toList());
        final List<LaboratoryIdentifierAndName> laboratoryIdentifierAndNames = laboratoryService
                .getAllIdentifiersAndNames();
        return new ApplicationSettings(applicationProperties, roles, laboratoryIdentifierAndNames);
    }
}