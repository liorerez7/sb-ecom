package com.ecommerce.project.security;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.reposetories.RoleRepository;
import com.ecommerce.project.reposetories.UserRepository;
import com.ecommerce.project.security.jwt.AuthEntryPointJwt;
import com.ecommerce.project.security.jwt.AuthTokenFilter;
import com.ecommerce.project.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    // Injects the custom UserDetailsService implementation
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // Injects the custom handler for unauthorized access (returns 401 JSON)
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    /**
     * Creates and returns the JWT authentication filter bean.
     * This filter checks JWT in each request header.
     */
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    /**
     * Configures the authentication provider.
     * This tells Spring Security how to load user data and how to check passwords.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        // Sets the custom UserDetailsService to fetch user details from DB
        authProvider.setUserDetailsService(userDetailsService);

        // Sets the password encoder to hash/check passwords with BCrypt
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    /**
     * Configures the password encoder.
     * BCrypt is used to securely hash passwords.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    /**
     * Configures the AuthenticationManager bean.
     * This manager performs actual authentication when needed.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Main security filter chain.
     * Defines all security rules: which URLs are public, which need JWT, and how to handle security.
     */
    @Bean
    public SecurityFilterChain FilterChain(HttpSecurity http) throws Exception {

        // Disable CSRF because we use JWT, not cookies/forms
        http.csrf(AbstractHttpConfigurer::disable)

                // Set custom unauthorized handler for 401 responses
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(unauthorizedHandler))

                // Set session management to stateless because JWT is used (no session stored on server)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Define URL rules
                .authorizeHttpRequests((requests) ->
                        requests
                                // Public endpoints: anyone can access without authentication
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers("/h2-console/**").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .requestMatchers("/api/public/**").permitAll()
                                .requestMatchers("/api/admin/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .requestMatchers("/api/images/**").permitAll()
                                .requestMatchers("/images/**").permitAll()
                                .requestMatchers("/api/addresses").permitAll()



                                // Any other request must be authenticated (must have valid JWT)
                                .anyRequest().authenticated()
                );

        // Register the custom authentication provider for username/password login
        http.authenticationProvider(authenticationProvider());

        // Add the JWT filter before UsernamePasswordAuthenticationFilter:
        // This ensures JWT validation happens early
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);


        http.headers(headers -> headers.frameOptions(
                HeadersConfigurer.FrameOptionsConfig::sameOrigin));

        // Build and return the security filter chain
        return http.build();
    }

    /**
     * Customize what to completely ignore in security (skip filters).
     * Useful for Swagger documentation resources.
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web -> web.ignoring().requestMatchers(
                "/v2/api-docs",
                "webjars/**",
                "/swagger-resources/**",
                "/swagger-ui.html",
                "/configuration/ui"
        ));
    }

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Retrieve or create roles
            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseGet(() -> {
                        Role newUserRole = new Role(AppRole.ROLE_USER);
                        return roleRepository.save(newUserRole);
                    });

            Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                    .orElseGet(() -> {
                        Role newSellerRole = new Role(AppRole.ROLE_SELLER);
                        return roleRepository.save(newSellerRole);
                    });

            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                    .orElseGet(() -> {
                        Role newAdminRole = new Role(AppRole.ROLE_ADMIN);
                        return roleRepository.save(newAdminRole);
                    });

            Set<Role> userRoles = Set.of(userRole);
            Set<Role> sellerRoles = Set.of(sellerRole);
            Set<Role> adminRoles = Set.of(userRole, sellerRole, adminRole);


            // Create users if not already present
            if (!userRepository.existsByUsername("user1")) {
                User user1 = new User("user1", "user1@example.com", passwordEncoder.encode("password1"));
                userRepository.save(user1);
            }

            if (!userRepository.existsByUsername("seller1")) {
                User seller1 = new User("seller1", "seller1@example.com", passwordEncoder.encode("password2"));
                userRepository.save(seller1);
            }

            if (!userRepository.existsByUsername("admin")) {
                User admin = new User("admin", "admin@example.com", passwordEncoder.encode("adminPass"));
                userRepository.save(admin);
            }

            // Update roles for existing users

            if (userRepository.existsByUsername("user1")) {
                User user = userRepository.findByUsername("user1").orElseThrow();
                user.setRoles(userRoles);
                userRepository.save(user);
            }

            if (userRepository.existsByUsername("seller1")) {
                User user = userRepository.findByUsername("seller1").orElseThrow();
                user.setRoles(userRoles);
                userRepository.save(user);
            }

            if (userRepository.existsByUsername("admin")) {
                User user = userRepository.findByUsername("admin").orElseThrow();
                user.setRoles(userRoles);
                userRepository.save(user);
            }
        };
    }
}
