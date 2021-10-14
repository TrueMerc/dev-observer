package ru.devobserver.services;

import ru.devobserver.dto.UserRegistrationDTO;
import ru.devobserver.entities.User;

import java.util.List;
import java.util.Optional;

/**
 * Provides interface for users management service.
 */
public interface UserService {

    /**
     * Returns overall users count.
     * @return Overall users count.
     */
    long getCount();

    /**
     * Returns user with given identifier if user exists.
     * @param id user identifier.
     * @return User with given identifier.
     */
    Optional<User> findById(Long id);

    /**
     * Returns user with given login if user exists.
     * @param login user login.
     * @return User with given login if user exists.
     */
    Optional<User> findByLogin(final String login);

    /**
     * Saves user with given registration data if user with same login doesn't exist.
     * @param data user registration data
     * @return true if operation is successful and false in other case.
     */
    User save(final UserRegistrationDTO data);

    /**
     * Removes user with given identifier.
     * @param id user identifier.
     */
    void delete(final Long id);

    /**
     * Returns the list of all users.
     * @return The list of all users.
     */
    List<User> findAll();

    /**
     * Returns The list of all users for given page.
     * @param pageNumber number of page.
     * @param usersPerPage number of users that are displayed on this page.
     * @return The list of all users for given page.
     */
    List<User> findAllForPage(final int pageNumber, final int usersPerPage);

    /**
     * Returns user for current authorized user.
     * @return User for current authorized user.
     */
    User currentUser();
}
