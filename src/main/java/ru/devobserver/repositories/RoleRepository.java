package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

}
