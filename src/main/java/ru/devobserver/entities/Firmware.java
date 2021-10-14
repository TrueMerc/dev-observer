package ru.devobserver.entities;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="firmware_files")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Firmware {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="original_name", nullable = false)
    private String originalName;

    @ManyToOne
    @JoinColumn(name="author_id", nullable = false)
    private User author;

    @Column(name="size")
    private long size;

    @Column(name="path")
    private String path;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Firmware user = (Firmware) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
