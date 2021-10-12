package ru.devobserver.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.devobserver.dto.UserRegistrationDTO;
import ru.devobserver.entities.User;
import ru.devobserver.repositories.RoleRepository;
import ru.devobserver.repositories.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class JpaUserService implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public JpaUserService(final UserRepository userRepository, final RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public long getCount() {
        return userRepository.count();
    }

    @Override
    public Optional<User> findById(final Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByLogin(final String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    @Transactional
    public User save(UserRegistrationDTO data) {
        final User user = new User();
        user.setLogin(data.getLogin());
        user.setPassword(new BCryptPasswordEncoder().encode(data.getPassword()));
        user.setFirstName(data.getFirstName());
        user.setLastName(data.getLastName());
        user.setPatronymic(data.getPatronymic());
        user.setEmail(data.getEmail());
        user.setRoles(
                Collections.singletonList(
                        roleRepository
                                .findById(data.getRoleId())
                                .orElseThrow(
                                        () -> new IllegalArgumentException("Undefined role with ID" + data.getRoleId())
                                )
                )
        );

        return userRepository.save(user);
    }

    @Override
    public void delete(final Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findAll() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @Override
    public List<User> findAllForPage(int pageNumber, int usersPerPage) {
        return userRepository.findAll(PageRequest.of(pageNumber, usersPerPage)).getContent();
    }
}
