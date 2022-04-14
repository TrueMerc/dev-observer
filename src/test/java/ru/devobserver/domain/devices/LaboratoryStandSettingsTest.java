package ru.devobserver.domain.devices;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import ru.devobserver.domain.devices.uart.LaboratoryStandSettings;
import ru.devobserver.domain.devices.uart.Parity;
import ru.devobserver.domain.devices.uart.StopBits;

import static org.junit.Assert.assertEquals;

public class LaboratoryStandSettingsTest {

    @Test
    @SneakyThrows
    void serializationTest() {
        // language=JSON
        final String expectedJson =
                "{\"baudRate\":9600,\"parity\":\"NONE\",\"dataBits\":8,\"stopBits\":\"ONE\"}";
        final LaboratoryStandSettings settings =
                new LaboratoryStandSettings(9600, Parity.NONE, 8, StopBits.ONE);
        final ObjectMapper objectMapper = new ObjectMapper();
        final String realJson = objectMapper.writeValueAsString(settings);
        assertEquals(expectedJson, realJson);
    }
}
