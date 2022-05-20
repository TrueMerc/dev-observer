package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.DeviceMode;

import java.util.List;

@Repository
public interface DeviceModeRepository extends CrudRepository<DeviceMode, Integer> {
    List<DeviceMode> findAll();
}
