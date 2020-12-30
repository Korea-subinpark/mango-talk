package com.messenger.mango.web;

import com.messenger.mango.common.jwt.JwtTokenProvider;
import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/user")
@RestController
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/chatRoom")
    public List<Long> getChatRoomIdList(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);
        String username = jwtTokenProvider.getUsername(token);
        return userService.getChatRoomIdList(username);
    }

    @PostMapping
    public Long save(@RequestBody UserDto.SaveRequest requestDto) {
        UserDto.SaveRequest encodedRequestDto = UserDto.SaveRequest.builder()
                .username(requestDto.getUsername())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .build();

        return userService.save(encodedRequestDto);
    }

}
