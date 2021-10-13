package ru.devobserver.controllers;

import org.hibernate.Hibernate;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.devobserver.dto.UserDTO;
import ru.devobserver.dto.UserRegistrationDTO;
import ru.devobserver.dto.UsersPageDTO;
import ru.devobserver.entities.User;
import ru.devobserver.services.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/currentUser")
    @ResponseBody
    public UserDTO getCurrentUser() {
        final String login = SecurityContextHolder.getContext().getAuthentication().getName();
        final User user = userService
                .findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Can't find principal"));
        Hibernate.initialize(user);
        return new UserDTO(user);
    }

    @GetMapping("/forPage/{pageNumber}/{usersPerPage}")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public UsersPageDTO getUsersPage(@PathVariable int pageNumber, @PathVariable int usersPerPage) {
        final long overallUsersCount = userService.getCount();
        final List<UserDTO> users = userService
                .findAllForPage(pageNumber, usersPerPage)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
        return new UsersPageDTO(overallUsersCount, users);
    }

    @PostMapping("/addUser")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public void addUser(@RequestBody final UserRegistrationDTO registrationData) {
        userService.save(registrationData);
    }

    @DeleteMapping("/deleteUser/{userId}")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public void deleteUser(@PathVariable long userId) {
        userService.delete(userId);
    }
}
