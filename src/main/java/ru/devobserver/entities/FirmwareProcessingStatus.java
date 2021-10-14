package ru.devobserver.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "firmware_processing_status")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FirmwareProcessingStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "displayed_name")
    private String displayedName;

    @Column(name = "description")
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        final FirmwareProcessingStatus status = (FirmwareProcessingStatus) o;
        return Objects.equals(id, status.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
