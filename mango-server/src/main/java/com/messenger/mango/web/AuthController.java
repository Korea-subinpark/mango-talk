package com.messenger.mango.web;

import com.messenger.mango.common.jwt.JwtTokenProvider;
import com.messenger.mango.domain.users.User;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/auth")
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @PostMapping("/login")
    public UserDto.LoginResponse login(@RequestBody UserDto.LoginRequest request) {
        User user = (User) userService.loadUserByUsername(request.getUsername());
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword(), user.getAuthorities());
        authenticationManager.authenticate(authentication);

        String token = jwtTokenProvider.createToken(user.getUsername(), user.getUserRole());

        return UserDto.LoginResponse.builder()
                .token(token)
                .build();
    }

}
