package com.ecommerce.project.reposetories;

import com.ecommerce.project.model.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository {

    Optional<User> findByUsername(@NotBlank String username);
}
