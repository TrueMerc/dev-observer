package ru.devobserver.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.devobserver.dto.UserRegistrationDTO;
import ru.devobserver.entities.User;
import ru.devobserver.repositories.RoleRepository;
import ru.devobserver.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class JpaUserService implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public JpaUserService(
            final UserRepository userRepository, final RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
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
        final User user = userRepository.findById(data.getId()).orElse(new User());
        user.setLogin(data.getLogin());
        final String password = data.isNewUser()
                ? passwordEncoder.encode(data.getPassword())
                : (data.getPassword().isEmpty() ? user.getPassword() : passwordEncoder.encode(data.getPassword()));
        user.setPassword(password);
        user.setFirstName(data.getFirstName());
        user.setLastName(data.getLastName());
        user.setPatronymic(data.getPatronymic());
        user.setEmail(data.getEmail());
        user.setRoles(
                new ArrayList<>(
                        Collections.singletonList(
                                roleRepository
                                        .findById(data.getRoleId())
                                        .orElseThrow(
                                                () -> new IllegalArgumentException(
                                                        "Undefined role with ID" + data.getRoleId()
                                                )
                                        )
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
        return userRepository.findAll(PageRequest.of(pageNumber, usersPerPage, Sort.by("id"))).getContent();
    }

    @Override
    public User currentUser() {
        return userRepository
                .findByLogin(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new IllegalStateException("Authenticated user doesn't exist in database."));
    }
}
