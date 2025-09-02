package com.ecommerce.project.reposetories;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(@NotBlank String username);
    boolean existsByEmail(@NotBlank @Size(max = 50) @Email String email);
    boolean existsByUsername(@NotBlank @Size(min = 3, max = 20) String username);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = :role")
    Page<User> findByRoleName(@Param("role") AppRole role, Pageable pageable);
}
