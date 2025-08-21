package com.ecommerce.project.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * AuthEntryPointJwt is triggered whenever an unauthenticated user
 * tries to access a protected resource (e.g., /user without JWT).
 *
 * Instead of sending a default 401 HTML page, this class builds
 * a structured JSON error response.
 *
 * It is registered inside SecurityConfig via:
 *   http.exceptionHandling().authenticationEntryPoint(...)
 */
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    /**
     * This method is triggered automatically by Spring Security
     * when an authentication failure occurs.
     *
     * Example: trying to access /hello or /user without token.
     */
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        // Log the unauthorized error (e.g., "Full authentication is required")
        logger.error("Unauthorized error: {}", authException.getMessage());

        // Tell the client that we're returning JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Set HTTP status code 401 (Unauthorized)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Create a JSON body with error details
        final Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);   // 401
        body.put("error", "Unauthorized");                          // human-readable label
        body.put("message", authException.getMessage());            // e.g. "Full authentication is required"
        body.put("path", request.getServletPath());                 // the endpoint that was accessed

        /**
         * Write the JSON to the response body.
         * This line converts the 'body' map to JSON and sends it to the client.
         *
         * For example:
         * {
         *   "status": 401,
         *   "error": "Unauthorized",
         *   "message": "Full authentication is required",
         *   "path": "/user"
         * }
         */
        final ObjectMapper mapper = new ObjectMapper();
        logger.warn("🚨 חסימת גישה (401) לנתיב: {} | הסיבה: {}", request.getRequestURI(), authException.getMessage());
        logger.warn("📡 האם הגיע Origin? {}", request.getHeader("Origin"));
        mapper.writeValue(response.getOutputStream(), body);
    }
}
