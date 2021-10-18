package ru.devobserver.services.exceptions;

public class FirmwareServiceException extends RuntimeException {
    public FirmwareServiceException() {
    }

    public FirmwareServiceException(String message) {
        super(message);
    }

    public FirmwareServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public FirmwareServiceException(Throwable cause) {
        super(cause);
    }
}
