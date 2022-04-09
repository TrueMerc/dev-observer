package ru.devobserver.domain.uart;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ParityTest {
    @Test
    @SneakyThrows
    void paritySerializationTest() {
        final String expectedValue = "\"NONE\"";
        final ObjectMapper mapper = new ObjectMapper();
        final String realValue = mapper.writeValueAsString(Parity.NONE);
        assertEquals(expectedValue, realValue);
    }

    @Test
    @SneakyThrows
    void parityDeserializationTest() {
        final Parity expectedValue = Parity.EVEN;
        final ObjectMapper mapper = new ObjectMapper();
        final String serializedValue = "\"EVEN\"";
        final Parity realValue = mapper.readValue(serializedValue, Parity.class);
        assertEquals(expectedValue, realValue);
    }
}
