package com.messenger.mango.service.users;

import com.messenger.mango.web.dto.UserDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    @DisplayName("회원, 없는 username 조회")
    void getWrongIDTest() {
        // given
        Long id = 2L;

        // when
        // then
        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername("wrongUsername");
        });
    }

    @Test
    @DisplayName("중복된 username 저장")
    void duplicateSaveTest() {
        // given
        String username = "duplicateUsername";
        String password = "qwe123";

        UserDto.SaveRequest request = UserDto.SaveRequest.builder()
                .username(username)
                .password(password)
                .build();

        userService.save(request);

        // when
        // then
        assertThrows(IllegalArgumentException.class, () -> {
            userService.save(request);
        });
    }

}