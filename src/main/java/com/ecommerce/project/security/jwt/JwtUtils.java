package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.micrometer.observation.transport.ResponseContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

/**
 * JwtUtils is a utility class responsible for all JWT-related operations:
 *
 * Responsibilities:
 * - Extract JWT token from HTTP headers
 * - Generate JWT tokens from UserDetails
 * - Validate token integrity and expiration
 * - Extract username (subject) from JWT
 * - Manage and expose the signing key based on the application secret
 */
@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // Secret key for signing the token (injected from application.properties)
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtCookie}")
    private String jwtCookie;

    // Token validity duration in milliseconds (injected from application.properties)
    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    /**
     * Extract the JWT token from the Authorization header in the request.
     * Expected format: "Authorization: Bearer <token>"
     */
//    public String getJwtFromHeader(HttpServletRequest request) {
//        String bearerToken = request.getHeader("Authorization");
//
//        logger.debug("Authorization Header: {}", bearerToken);
//
//        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
//            return bearerToken.substring(7); // Remove "Bearer " prefix
//        }
//
//        return null;
//    }

    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
        String jwt = generateTokenFromUsername(userPrincipal);

        // Create a cookie with the JWT token
        return ResponseCookie.from(jwtCookie, jwt)
                .httpOnly(false) // Prevents JavaScript access
                .secure(true) // Use secure cookies in production (HTTPS)
                .path("/api") // Cookie is valid for the entire application
                .maxAge(24 * 60 * 60) // Set cookie expiration based on JWT expiration
                .build();
    }
    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);

        if(cookie != null) {
            return cookie.getValue();
        }

        return null;
    }


    /**
     * Generates a new JWT token based on the given UserDetails.
     * The token contains:
     * - Subject (username)
     * - Issue time (now)
     * - Expiration time (now + jwtExpirationMs)
     * - Signed with HMAC SHA key based on jwtSecret
     */

    public String generateTokenFromUsername(UserDetails userDetails) {
        String username = userDetails.getUsername();

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date().getTime() + jwtExpirationMs)))
                .signWith(key())
                .compact();
    }

    /**
     * Extracts the subject (username) from the JWT token.
     * Only works if the token is signed correctly.
     */
    public String getUserNameFromJWTToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /**
     * Returns the SecretKey object used to sign/verify JWTs.
     * Uses Base64-decoded secret from application.properties.
     */
    public Key key() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }

    /**
     * Validates the token by:
     * - Checking its signature
     * - Making sure it's not expired
     * - Ensuring the token structure is correct
     * Logs and returns false if any issue is detected.
     */
    public boolean validateJwtToken(String authToken) {
        try {
            logger.info("Validating JWT token: {}", authToken);

            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseClaimsJws(authToken);

            return true;

        } catch (MalformedJwtException exception) {
            logger.error("Invalid JWT token: {}", exception.getMessage());

        } catch (ExpiredJwtException exception) {
            logger.error("Expired JWT token: {}", exception.getMessage());

        } catch (UnsupportedJwtException exception) {
            logger.error("Unsupported JWT token: {}", exception.getMessage());

        } catch (IllegalArgumentException exception) {
            logger.error("JWT claims string is empty: {}", exception.getMessage());
        }

        return false;
    }
}
