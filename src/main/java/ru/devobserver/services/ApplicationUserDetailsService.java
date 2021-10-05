package ru.devobserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.devobserver.entities.Role;


import javax.transaction.Transactional;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {

    private static final String USER_NOT_FOUND_MESSAGE = "User with login %s not found.";

    private final UserService userService;

    @Autowired
    public ApplicationUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userService.findByLogin(username).orElseThrow(
                () -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, username))
        );
        return new User(user.getLogin(), user.getPassword(), rolesToAuthorities(user.getRoles()));
    }

    private static Collection<? extends GrantedAuthority> rolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
