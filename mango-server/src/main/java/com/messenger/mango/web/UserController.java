package com.messenger.mango.web;

import com.messenger.mango.service.users.UserService;
import com.messenger.mango.web.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RequestMapping("/mango/v1/user")
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping
    public Long save(@RequestBody @Valid UserDto.SaveRequest requestDto) {
        return userService.save(requestDto);
    }

}
