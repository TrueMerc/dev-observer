package ru.devobserver.dto;

import ru.devobserver.entities.Role;

public class RoleDTO {
    private final long id;
    private final String name;

    public RoleDTO(final Role role) {
        this.id = role.getId();
        this.name = role.getDisplayedName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
