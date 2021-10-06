package ru.devobserver.controllers;

import org.hibernate.Hibernate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.devobserver.dto.UserDTO;
import ru.devobserver.entities.User;
import ru.devobserver.services.UserService;

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
}
