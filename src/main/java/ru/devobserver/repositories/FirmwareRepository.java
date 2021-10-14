package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.Firmware;
import ru.devobserver.entities.User;

@Repository
public interface FirmwareRepository extends CrudRepository<Firmware, Long> {
    long countAllByAuthor(User user);
}
