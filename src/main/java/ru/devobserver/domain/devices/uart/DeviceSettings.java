package ru.devobserver.domain.devices.uart;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({@JsonSubTypes.Type(value = LaboratoryStandSettings.class, name = "LaboratoryStandSettings")})
public interface DeviceSettings {
}
