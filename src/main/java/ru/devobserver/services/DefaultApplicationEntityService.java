package ru.devobserver.services;

import org.springframework.stereotype.Service;
import ru.devobserver.domain.ApplicationEntities;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.dto.RoleDTO;
import ru.devobserver.entities.DeviceMode;
import ru.devobserver.entities.projections.LaboratoryIdentifierAndName;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultApplicationEntityService implements ApplicationEntityService {
    private final LaboratoryService laboratoryService;
    private final RoleService roleService;
    private final DeviceService deviceService;

    public DefaultApplicationEntityService(
            final LaboratoryService laboratoryService,
            final RoleService roleService,
            final DeviceService deviceService) {
        this.laboratoryService = laboratoryService;
        this.roleService = roleService;
        this.deviceService = deviceService;
    }

    @Override
    public ApplicationEntities getApplicationEntities() {
        final List<RoleDTO> roles = roleService.findAll().stream().map(RoleDTO::new).collect(Collectors.toList());
        final List<LaboratoryIdentifierAndName> laboratoryIdentifierAndNames = laboratoryService
                .getAllIdentifiersAndNames();
        final List<DeviceMode> deviceModes = deviceService.getDeviceModes();
        final List<DeviceDTO> devices = deviceService.getDevices();
        return new ApplicationEntities(roles, laboratoryIdentifierAndNames, deviceModes, devices);
    }
}
