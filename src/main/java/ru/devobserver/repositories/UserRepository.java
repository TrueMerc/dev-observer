package ru.devobserver.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.User;

import java.util.Optional;

/**
 * Provides interface for repository which manipulates 'User' entities.
 */
@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    /**
     * Returns user by their login.
     * @param login user login.
     * @return User with given login.
     */
    Optional<User> findByLogin(String login);

    /**
     * Returns users for given page item.
     * @param pageable page item.
     * @return Users for given page item.
     */
    @Override
    @NonNull
    Page<User> findAll(@NonNull Pageable pageable);
}
