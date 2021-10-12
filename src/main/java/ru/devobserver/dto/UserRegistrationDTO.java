package ru.devobserver.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Getter;

@Getter
@JsonDeserialize(builder = UserRegistrationDTO.Builder.class)
public class UserRegistrationDTO {
    private final String login;
    private final String password;
    private final String lastName;
    private final String firstName;
    private final String patronymic;
    private final String email;
    private final long roleId;

    private UserRegistrationDTO(Builder builder) {
        login = builder.getLogin();
        password = builder.getPassword();
        lastName = builder.getLastName();
        firstName = builder.getFirstName();
        patronymic = builder.getPatronymic();
        email = builder.getEmail();
        roleId = builder.getRoleId();
    }

    @JsonPOJOBuilder
    @Getter
    public static class Builder {
        private String login;
        private String password;
        private String lastName;
        private String firstName;
        private String patronymic;
        private String email;
        private int roleId;

        Builder withLogin(final String login) {
            this.login = login;
            return this;
        }

        Builder withPassword(final String password) {
            this.password = password;
            return this;
        }

        Builder withFirstName(final String firstName) {
            this.firstName = firstName;
            return this;
        }

        Builder withLastName(final String lastName) {
            this.lastName = lastName;
            return this;
        }

        Builder withPatronymic(final String patronymic) {
            this.patronymic = patronymic;
            return this;
        }

        Builder withEmail(final String email) {
            this.email = email;
            return this;
        }

        Builder withRoleId(final int roleId) {
            this.roleId = roleId;
            return this;
        }

        public UserRegistrationDTO build() {
            return new UserRegistrationDTO(this);
        }
    }
}
