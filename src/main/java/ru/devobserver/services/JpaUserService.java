package ru.devobserver.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.devobserver.dto.UserDTO;
import ru.devobserver.entities.User;
import ru.devobserver.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class JpaUserService implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public JpaUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public User save(UserDTO data) {
        throw new UnsupportedOperationException("This operation is unimplemented yet");
    }

    @Override
    public void delete(Long id) {
        throw new UnsupportedOperationException("This operation is unimplemented yet");
    }

    @Override
    public List<User> findAll() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }
}
