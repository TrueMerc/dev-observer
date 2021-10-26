package ru.devobserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import ru.devobserver.entities.User;

@Getter
public class UserDTO {
    private final Long id;
    private final String login;
    private final String firstName;
    private final String lastName;
    private final String patronymic;
    private final String email;
    private final long roleId;
    @JsonProperty
    private final boolean isAdministrator;

    public UserDTO(final User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.patronymic = user.getPatronymic();
        this.email = user.getEmail();
        this.roleId = user.getRoles().get(0).getId();
        this.isAdministrator = user
                .getRoles()
                .stream()
                .filter(role -> role.getName().equals("ROLE_ADMIN"))
                .findFirst()
                .isPresent();
    }
}
