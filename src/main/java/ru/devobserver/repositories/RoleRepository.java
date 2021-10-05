package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.devobserver.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
