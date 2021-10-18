package ru.devobserver.services;

import ru.devobserver.entities.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();
}
