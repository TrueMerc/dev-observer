package ru.devobserver.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ru.devobserver.entities.Laboratory;
import ru.devobserver.entities.projections.LaboratoryIdentifierAndName;

import java.util.List;
import java.util.Optional;

public interface LaboratoryRepository extends CrudRepository<Laboratory, Long> {
    @Query(value = "SELECT materials_file_name FROM laboratories WHERE id = ?1", nativeQuery = true)
    Optional<String> findMaterialsFileNameById(Long id);

    List<LaboratoryIdentifierAndName> findAllProjectedBy();
}
