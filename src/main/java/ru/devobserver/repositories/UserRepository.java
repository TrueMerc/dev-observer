package ru.devobserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.devobserver.entities.User;

import java.util.Optional;

/**
 * Provides interface for repository which manipulates 'User' entities.
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByLogin(String login);
}
