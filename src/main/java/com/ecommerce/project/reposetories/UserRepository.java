package com.ecommerce.project.reposetories;

import com.ecommerce.project.model.Product;
import com.ecommerce.project.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(@NotBlank String username);
    boolean existByEmail(@NotBlank @Size(max = 50) @Email String email);
    boolean existsByUsername(@NotBlank @Size(min = 3, max = 20) String username);
}
