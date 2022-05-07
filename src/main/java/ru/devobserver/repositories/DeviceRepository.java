package ru.devobserver.repositories;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.Device;
import ru.devobserver.entities.projections.DeviceSettingsProjection;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Long> {

    @EntityGraph(attributePaths = { "mode" })
    Optional<Device> findById(Long id);

    List<Device> findAll();

    Optional<DeviceSettingsProjection> findSettingsById(Long id);
}
