package ru.devobserver.entities;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.util.Map;
import java.util.Objects;

@Entity
@Table(name="laboratories")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@TypeDefs({
        @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
})
public class Laboratory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "goal", nullable = false)
    private String goal;

    @Column(name = "description", nullable = false)
    @Type(type = "jsonb")
    private Map<String, Object> description;

    @Column(name = "materials_file_name", nullable = false)
    private String materialsFileName;

    @Column(name = "materials_displayed_file_name", nullable = false)
    private String materialsDisplayedFileName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Laboratory that = (Laboratory) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
