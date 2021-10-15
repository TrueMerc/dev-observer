package ru.devobserver.entities;

import ru.devobserver.domain.FirmwareStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class FirmwareStatusConverter implements AttributeConverter<FirmwareStatus, Short> {
    @Override
    public Short convertToDatabaseColumn(FirmwareStatus firmwareStatus) {
        return firmwareStatus.toShort();
    }

    @Override
    public FirmwareStatus convertToEntityAttribute(Short value) {
        return FirmwareStatus.of(value);
    }
}
