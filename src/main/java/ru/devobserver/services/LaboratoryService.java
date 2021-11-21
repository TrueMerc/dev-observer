package ru.devobserver.services;

import org.springframework.core.io.FileSystemResource;
import ru.devobserver.entities.Laboratory;
import ru.devobserver.entities.projections.LaboratoryIdentifierAndName;

import java.util.List;

public interface LaboratoryService {
    long count();

    Laboratory findById(long id);

    FileSystemResource fileResourceById(long id);

    List<LaboratoryIdentifierAndName> getAllIdentifiersAndNames();
}
