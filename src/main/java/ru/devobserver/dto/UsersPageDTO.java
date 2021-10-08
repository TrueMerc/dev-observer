package ru.devobserver.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class UsersPageDTO {
    private final long overallUsersCount;
    private final List<UserDTO> users;

    /**
     * Creates DTO for page which contains information about users.
     * @param overallUsersCount count of all application users.
     * @param pageUsers user list for current page.
     */
    public UsersPageDTO(long overallUsersCount, List<UserDTO> pageUsers) {
        this.overallUsersCount = overallUsersCount;
        this.users = pageUsers;
    }
}
