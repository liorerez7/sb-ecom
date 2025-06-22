package com.ecommerce.project.util;

import com.ecommerce.project.model.User;
import com.ecommerce.project.reposetories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    @Autowired
    private UserRepository userRepository;

    public String loggedInEmail() {
        User user = getLoggedInUser();
        return user.getEmail();
    }

    public Long loggedInUserId() {
        User user = getLoggedInUser();
        return user.getId();
    }



    public User getLoggedInUser() throws UsernameNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(authentication.getName()).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );
    }
}
