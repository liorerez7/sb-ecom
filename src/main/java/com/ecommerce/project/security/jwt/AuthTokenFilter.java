package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * AuthTokenFilter is a custom security filter that intercepts all HTTP requests.
 *
 * Main responsibilities:
 * - Extract JWT token from Authorization header (if exists)
 * - Validate the token using JwtUtils
 * - Extract the username from the token and load the user from the database
 * - Set the authenticated user into Spring SecurityContext
 *
 * This filter runs ONCE per request (extends OncePerRequestFilter) and is executed
 * before UsernamePasswordAuthenticationFilter in the security filter chain.
 */
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        logger.debug("=== AuthTokenFilter Debug ===");
        logger.debug("Request URI: {}", request.getRequestURI());
        logger.debug("Request Method: {}", request.getMethod());

        // ✅ הוספת debug ל-cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                logger.debug("Cookie: {} = {}", cookie.getName(), cookie.getValue());
            }
        } else {
            logger.debug("No cookies found in request");
        }


        logger.info("🔍 [AuthTokenFilter] בקשה: {} {}", request.getMethod(), request.getRequestURI());
        logger.info("🔍 Origin: {}", request.getHeader("Origin"));
        logger.info("🔍 Cookie Header: {}", request.getHeader("Cookie"));


        try {
            // Extract the token from the Authorization header (if present)
            String jwt = parseJwt(request);

            // If token is found and is valid, proceed to authenticate
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {

                logger.info("✅ JWT תקף, ממשיכים לאימות מול בסיס נתונים...");


                // Extract the username from the JWT payload
                String username = jwtUtils.getUserNameFromJWTToken(jwt);

                // Load the user from the database using the username
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Create an authenticated token object (no password needed at this point)
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                // Set additional web request info (like remote IP, session ID)
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Save the authenticated user into Spring's SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Log user roles for debugging
                logger.debug("Roles from JWT: {}", userDetails.getAuthorities());
            }

            if (jwt == null) {
                logger.warn("🚫 לא נמצא JWT בבקשה (לא הגיע בקוקי)");
            } else {
                logger.info("✅ נמצא JWT בבקשה (מוסתר): {}...{}", jwt.substring(0, 10), jwt.substring(jwt.length() - 10));
            }


        } catch (Exception e) {
            // If something goes wrong (e.g. token parsing fails), log the error
            logger.error("Cannot set user authentication: {}", e);
        }

        // Continue processing the rest of the filter chain (next filters/controllers)
        filterChain.doFilter(request, response);
    }

    /**
     * Extracts the JWT token from the Authorization header (if exists)
     * Example: "Authorization: Bearer <token>"
     */
    private String parseJwt(HttpServletRequest request) {
        //String jwt = jwtUtils.getJwtFromHeader(request);
        String jwt = jwtUtils.getJwtFromCookies(request);

        // Log the extracted token (or null)
        logger.debug("AuthTokenFilter.java: {}", jwt);

        return jwt;
    }
}
