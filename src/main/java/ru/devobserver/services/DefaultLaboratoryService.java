package ru.devobserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.entities.Laboratory;
import ru.devobserver.entities.projections.LaboratoryIdentifierAndName;
import ru.devobserver.exceptions.LaboratoryException;
import ru.devobserver.repositories.LaboratoryRepository;

import java.util.List;

@Service
public class DefaultLaboratoryService implements LaboratoryService {
    private final LaboratoryRepository laboratoryRepository;

    private final ApplicationProperties applicationProperties;

    @Autowired
    public DefaultLaboratoryService(
            final LaboratoryRepository laboratoryRepository,
            final ApplicationProperties applicationProperties
    ) {
        this.laboratoryRepository = laboratoryRepository;
        this.applicationProperties = applicationProperties;
    }

    @Override
    public long count() {
        return laboratoryRepository.count();
    }

    @Override
    public Laboratory findById(long id) {
        return laboratoryRepository
                .findById(id)
                .orElseThrow(() -> new LaboratoryException("Can't find laboratory with ID " + id));
    }

    @Override
    public FileSystemResource fileResourceById(long id) {
        final String fileName = laboratoryRepository
                .findMaterialsFileNameById(id)
                .orElseThrow(() -> new LaboratoryException("Can't find file name for laboratory with ID " + id));
        final String filePath = applicationProperties.getLaboratoriesFolder() + "/" + fileName;
        return new FileSystemResource(filePath);
    }

    @Override
    public List<LaboratoryIdentifierAndName> getAllIdentifiersAndNames() {
        return laboratoryRepository.findAllProjectedBy();
    }
}
