package com.gbc.assignment1.security;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

import com.gbc.assignment1.Assignment1Application;
import com.gbc.assignment1.models.AppUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenManager implements Serializable {
    private static final long serialVersionUID = 7008375124389347049L;
    public static final long TOKEN_VALIDITY = 10 * 60 * 60;

    private static byte[] jwtSecret;

    public static String generateJwtToken(AppUser user) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    public static Boolean validateJwtToken(String token, AppUser user) {
        // Clean token
        token = token.replaceFirst("\\s*[Bb]earer\\s*", "");

        String username = getUsernameFromToken(token);
        Claims claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody();

        Boolean isTokenExpired = claims.getExpiration().before(new Date());

        return (username.equals(user.getUsername()) && !isTokenExpired);
    }

    public static String getUsernameFromToken(String token) {
        // Clean token
        token = token.replaceFirst("\\s*[Bb]earer\\s*", "");

        final Claims claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody();

        return claims.getSubject();
    }

    public static void init() {
        try {
            jwtSecret = Assignment1Application.ENV_CONF.get("SECRET_KEY").getBytes("UTF-8");
        }
        catch (Exception ex) {
            System.out.println(ex);
        }
    }
}
