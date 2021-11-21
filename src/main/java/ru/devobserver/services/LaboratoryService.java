package ru.devobserver.services;

import org.springframework.core.io.FileSystemResource;
import ru.devobserver.entities.Laboratory;

public interface LaboratoryService {
    long count();

    Laboratory findById(long id);

    FileSystemResource fileResourceById(long id);
}
