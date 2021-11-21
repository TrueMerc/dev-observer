package ru.devobserver.exceptions;

public class LaboratoryException extends RuntimeException {
    public LaboratoryException() {
        super();
    }

    public LaboratoryException(String message) {
        super(message);
    }

    public LaboratoryException(String message, Throwable cause) {
        super(message, cause);
    }

    public LaboratoryException(Throwable cause) {
        super(cause);
    }
}
