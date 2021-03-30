package com.messenger.mango.common.jwt;

import com.messenger.mango.domain.UserRole;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class JwtTokenProviderTest {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("유효한 토큰 검증")
    void validateTokenTest1() {
        String token = jwtTokenProvider.createToken("admin", UserRole.ADMIN);

        assertEquals(true, jwtTokenProvider.validateToken(token));
    }

    @Test
    @DisplayName("유효기간이 지난 토큰 검증")
    void validateTokenTest2() {
        Date now = new Date();
        String token = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + 1))
                .signWith(SignatureAlgorithm.HS256, "secret")
                .compact();

        assertEquals(false, jwtTokenProvider.validateToken(token));
    }

    @Test
    @DisplayName("Secret Key가 유효하지 않을 때")
    void validateTokenTest3() {
        Date now = new Date();
        String token = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + 1))
                .signWith(SignatureAlgorithm.HS256, "test")
                .compact();

        assertEquals(false, jwtTokenProvider.validateToken(token));
    }
}