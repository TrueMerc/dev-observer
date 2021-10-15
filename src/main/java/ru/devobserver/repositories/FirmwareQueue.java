package ru.devobserver.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.domain.FirmwareStatus;
import ru.devobserver.entities.Firmware;
import ru.devobserver.entities.FirmwareQueueItem;

import java.util.Optional;

@Repository
public interface FirmwareQueue extends CrudRepository<FirmwareQueueItem, Long> {
    long countAllByStatusNot(FirmwareStatus status);

    // language = PostgreSQL
    @Query(value = "SELECT count(*) " +
            "FROM firmware_queue " +
            "WHERE status <> 3 AND id < (" +
            "SELECT min(fq.id) FROM firmware_queue AS fq " +
            "JOIN firmware_files ff on ff.id = fq.firmware_id " +
            "WHERE ff.author_id = ?1 AND fq.status <> 3)", nativeQuery = true)
    long itemsBeforeUserFirstFirmware(long userId);
}
