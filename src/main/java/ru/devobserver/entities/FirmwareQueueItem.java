package ru.devobserver.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

import ru.devobserver.domain.FirmwareStatus;

@Entity
@Table(name="firmware_queue")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FirmwareQueueItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="firmware_id", nullable = false)
    private Firmware firmware;

    @Column(name="status", nullable = false)
    private FirmwareStatus status;

    /**
     * Creates new firmware execution queue item.
     * @param firmware firmware.
     */
    public FirmwareQueueItem(final Firmware firmware) {
        this.firmware = firmware;
        this.status = FirmwareStatus.WAITING;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        final FirmwareQueueItem queueItem = (FirmwareQueueItem) o;
        return Objects.equals(id, queueItem.id);
    }

    @Override
    public int hashCode() {
        return Long.valueOf(id).hashCode();
    }
}
