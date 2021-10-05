package ru.devobserver.services;

import ru.devobserver.dto.UserDTO;
import ru.devobserver.entities.User;

import java.util.List;
import java.util.Optional;

/**
 * Provides interface for users management service.
 */
public interface UserService {
    /**
     * Returns user with given identifier if user exists.
     * @param id user identifier.
     * @return user with given identifier.
     */
    Optional<User> findById(Long id);

    /**
     * Returns user with given login if user exists.
     * @param login
     * @return
     */
    Optional<User> findByLogin(final String login);

    /**
     * Saves user with given registration data if user with same login doesn't exist.
     * @param data user registration data
     * @return true if operation is successful and false in other case.
     */
    User save(final UserDTO data);

    /**
     * Removes user with given identifier.
     * @param id user identifier.
     */
    void delete(final Long id);

    /**
     * Returns the list of all users.
     * @return the list of all users.
     */
    List<User> findAll();
}
