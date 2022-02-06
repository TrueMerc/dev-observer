package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.Device;

import java.util.List;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Long> {
    List<Device> findAll();
}
