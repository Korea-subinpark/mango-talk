package com.messenger.mango.common.config;

import com.messenger.mango.common.jwt.JwtConfig;
import com.messenger.mango.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        // 의도적으로 해시 속도를 늦춘다.
        // Bruteforce attack이나 Rainbow table attack의 저항력을 높이기 위해 설계
        // 강도조절 가능 default는 10
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //@formatter:off
        http
                .httpBasic().disable() // 폼로그인 방식을 disable
                .csrf().disable() // JWT 토큰 자체가 csrf 공격을 방지하는 역할을 하므로 disable
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증 방식에는 세션이 필요없으므로 세션 정책을 Stateless로 변경
                .and()
                .authorizeRequests() // URI 마다 권한 설정
                .antMatchers("/mango/v1/auth/login", "/mango/v1/user").permitAll()
                .antMatchers("/", "/stomp/**", "/app/**").permitAll() // socket test를 위해 허용
                .anyRequest().authenticated()
                .and()
                .apply(new JwtConfig(jwtTokenProvider)); // JwtConfig 등록
        //@formatter:on
    }
}
