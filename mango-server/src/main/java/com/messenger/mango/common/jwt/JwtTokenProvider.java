package com.messenger.mango.common.jwt;

import com.messenger.mango.domain.UserRole;
import com.messenger.mango.service.users.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private String secretKey = "secret"; //원래는 실제 운영용 application-real.yml을 만들어서 @Value를 이용해 관리해야함 (gitignore에도 등록)
    private long tokenExpireTime = 3600000; // 1시간

    private final UserService userService;

    /**
     * Token을 생성하고 반환하는 함수
     */
    public String createToken(String username, UserRole userRole) {
        Claims claims = Jwts.claims()
                .setSubject(username);
        claims.put("role", userRole);

        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + tokenExpireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * Token에서 인증 객체를 얻어오는 함수
     */
    public Authentication getAuthentication(String token) {
        UserDetails user = userService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
    }

    /**
     * Token에서 유저이름을 추출하여 반환하는 함수
     */
    public String getUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Request Header의 Authorization에 담겨온 Token을 추출하여 반환하는 함수
     */
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }

        return null;
    }

    /**
     * Token의 유효성을 검사하는 함수
     */
    public boolean validateToken(String token) {
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token);

        Date expirationDate = claims.getBody().getExpiration();
        if (expirationDate.before(new Date())) {
            return false;
        }
        return true;
    }
}
