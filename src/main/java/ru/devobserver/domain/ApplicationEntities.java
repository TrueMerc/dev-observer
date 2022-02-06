package ru.devobserver.domain;

import lombok.Getter;
import ru.devobserver.dto.DeviceDTO;
import ru.devobserver.dto.RoleDTO;
import ru.devobserver.entities.DeviceMode;
import ru.devobserver.entities.projections.LaboratoryIdentifierAndName;

import java.util.List;

/**
 * A container for main application entities like user roles, available devices, laboratories, etc.
 */
@Getter
public class ApplicationEntities {
    private final List<RoleDTO> roles;
    private final List<LaboratoryIdentifierAndName> laboratoryIdentifiersAndNames;
    private final List<DeviceMode> deviceModes;
    private final List<DeviceDTO> devices;

    public ApplicationEntities(
            final List<RoleDTO> roles,
            final List<LaboratoryIdentifierAndName> laboratoryIdentifiersAndNames,
            final List<DeviceMode> deviceModes,
            final List<DeviceDTO> devices) {
        this.roles = roles;
        this.laboratoryIdentifiersAndNames = laboratoryIdentifiersAndNames;
        this.deviceModes = deviceModes;
        this.devices = devices;
    }
}
