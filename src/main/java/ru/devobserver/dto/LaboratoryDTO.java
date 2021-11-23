package ru.devobserver.dto;

import lombok.Getter;
import ru.devobserver.entities.Laboratory;

import java.util.Map;

@Getter
public class LaboratoryDTO {
    private long id;
    private String name;
    private String goal;
    private Map<String, Object> description;
    private String displayedFileName;

    public LaboratoryDTO(final Laboratory laboratory) {
        this.id = laboratory.getId();
        this.name = laboratory.getName();
        this.goal = laboratory.getGoal();
        this.description = laboratory.getDescription();
        this.displayedFileName = laboratory.getMaterialsDisplayedFileName();
    }
}
