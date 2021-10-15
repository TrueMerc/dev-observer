package ru.devobserver.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.domain.FirmwareStatus;
import ru.devobserver.entities.Firmware;
import ru.devobserver.entities.User;

import java.util.Optional;

@Repository
public interface FirmwareRepository extends CrudRepository<Firmware, Long> {
    long countAllByAuthor(User user);

    @Query("SELECT DISTINCT f FROM FirmwareQueueItem qi JOIN qi.firmware f WHERE qi.status = ?1")
    Optional<Firmware> findByStatus(FirmwareStatus status);

    @Query("SELECT (case when count(f) > 0  then true else false end) " +
            "FROM FirmwareQueueItem qi JOIN qi.firmware f " +
            "WHERE f.author = ?1 AND qi.status <> ?2")
    boolean existsByAuthorAndStatusNot(User user, FirmwareStatus status);
}
