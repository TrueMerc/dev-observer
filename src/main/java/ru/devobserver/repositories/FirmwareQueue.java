package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.FirmwareQueueItem;

@Repository
public interface FirmwareQueue extends CrudRepository<FirmwareQueueItem, Long> {
}
