package com.ecommerce.project.security;

import com.ecommerce.project.security.jwt.AuthEntryPointJwt;
import com.ecommerce.project.security.jwt.AuthTokenFilter;
import com.ecommerce.project.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .requestMatchers("/api/public/**").permitAll()
                                .requestMatchers("/api/admin/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .requestMatchers("/api/images/**").permitAll()

                                // Any other request must be authenticated (must have valid JWT)
                                .anyRequest().authenticated()
                );

        // Register the custom authentication provider for username/password login
        http.authenticationProvider(authenticationProvider());

        // Add the JWT filter before UsernamePasswordAuthenticationFilter:
        // This ensures JWT validation happens early
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

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
}
