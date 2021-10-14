package ru.devobserver.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import ru.devobserver.repositories.FirmwareQueue;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="firmware_queue")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FirmwareQueueItem {

    private static final int DEFAULT_FIRMWARE_STATUS_ID = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="firmware_id", nullable = false)
    private Firmware firmware;

    @ManyToOne
    @JoinColumn(name="status", nullable = false)
    private FirmwareProcessingStatus status;

    public FirmwareQueueItem(final Firmware firmware) {
        this.firmware = firmware;
        final FirmwareProcessingStatus status = new FirmwareProcessingStatus();
        status.setId(DEFAULT_FIRMWARE_STATUS_ID);
        this.status = status;
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
        return 0;
    }
}
